import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Loader from './../components/controls/Loader';
import { ErrorStatus } from './../components/panel/ErrorBox';
import { InstallationMenu, findWizardStep } from './../config/Wizards';

const AppStatus = ({ router, setup, children }) => {
  const path = router.location.pathname;
  const notInInstall = findWizardStep(InstallationMenu, path) === -1;

  const { serverStatus, isFirstRun } = setup;
  const { error, isLoading } = serverStatus;
  if (isLoading) return <Loader />;
  if (notInInstall && isFirstRun) return <Redirect to='/welcome' />
  if (error) return <ErrorStatus message={error} />;

  return <div>{children}</div>;
};

const mapStateToProps = state => (state);
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppStatus);
