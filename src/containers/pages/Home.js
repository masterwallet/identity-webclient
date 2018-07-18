import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const HomeScreen = ({ setup, assets }) => {
  const { isFirstRun, serverStatus } = setup;
  const { isLoading } = serverStatus;
  if (isLoading) return false;
  const to = isFirstRun ? '/welcome' : (
      assets.wallets.length ? '/wallets' : '/add'
  );
  return (<Redirect to={to} />)
};


export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default { Home };
