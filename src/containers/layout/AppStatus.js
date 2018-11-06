import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Loader from './../../components/controls/Loader';
import { ErrorStatus } from './../../components/panel/ErrorBox';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { isLoggedIn, tokenIsExpiring } from '../../services/Utils';
import { fetchJson } from './../../services/ApiRequest';

class AppStatus extends React.Component {

  componentWillReceiveProps = (nextProps) => {
    const { setup } = nextProps;
    const { auth } = setup;
    if (tokenIsExpiring() && !auth.isLoading && !auth.error) {
      this.props.refreshToken();
    }
  };

  render = () => {
    const { router, setup, children } = this.props;
    const path = router.location.pathname;
    const notInInstall = findWizardStep(InstallationMenu, path) === -1;
  
    const { serverStatus, isFirstRun } = setup;
    const { error, isLoading } = serverStatus;
    if (isLoading) return <Loader />;
    if (notInInstall && isFirstRun) return <Redirect to='/welcome' />
    if (error) return <ErrorStatus message={error} />;
    if (!isLoggedIn() && ![ ...InstallationMenu, '/unlock' ].includes(path)) return <Redirect to='/unlock' />
  
    return <div>{children}</div>;
  };
};

const mapStateToProps = state => (state);
const mapDispatchToProps = dispatch => ({
  refreshToken: () => {
    dispatch({ type: 'AUTH_TOKEN_REQUEST' });
    fetchJson('/api/auth/refresh').then(response => {
      if (response.error) {
        dispatch({ type: 'AUTH_TOKEN_ERROR', payload: response.error });
      } else {
        dispatch({ type: 'AUTH_TOKEN_RECEIVED', payload: response.data });
        sessionStorage.setItem('authToken', JSON.stringify(response.data));
      }
    }).catch(error => {
      dispatch({ type: 'AUTH_TOKEN_ERROR', payload: error.message });
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppStatus);
