import React from 'react';
import { connect } from "react-redux";

const AppStatus = ({ router, setup }) => {
  console.log('AppStatus:', router, setup);
  const { serverStatus } = setup;
  const { data, error } = serverStatus;
  
  const installation = setup.serverStatus.data.installation;

  // !installation = server is not running
  
  return (<pre>{JSON.stringify(installation, null, 2)}</pre>);
};

const mapStateToProps = state => (state);
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppStatus);