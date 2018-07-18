import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const ReadyRedirect = ({ setup, assets }) => {
  const { isFirstRun, serverStatus } = setup;
  const { isLoading } = serverStatus;

  const to = assets.wallets.length ? '/wallets' : '/add';
  if (!isLoading && !isFirstRun) return (<Redirect to={to} />);
  return false;
};

const mapStateToProps = state => (state);
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReadyRedirect);
