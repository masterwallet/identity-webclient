import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatchWalletsStatus } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: (props) => {
    dispatchWalletsStatus(dispatch, props);
  }
});

export class HomeScreen extends React.Component {
  componentWillMount() {
    this.props.onInit(this.props);
  }
  render() {
    const { setup, assets } = this.props;
    const { isFirstRun, serverStatus } = setup;
    const { isLoading } = serverStatus;
    if (isLoading) return false;
    const { status } = assets;
    if (status && status.isLoading) return false;
    const to = isFirstRun ? '/welcome' : (
      assets.wallets.length ? '/wallets' : '/add'
    );
    return (<Redirect to={to} />)
  }
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default { Home };
