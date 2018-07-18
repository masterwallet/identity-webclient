import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
// import { InstallationMenu, findWizardStep } from './../../config/Wizards';

const _t = {
  pleaseFinishInstall: 'Please follow installation steps'
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 30px;
  left: 0px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #9469f5;
  text-shadow: 0px 0px 25px #e3daf2;
`;

const FirstRun = ({ setup }) => {
  const { serverStatus, isFirstRun } = setup;
  const { isLoading } = serverStatus;
  if (isLoading) return false;
  if (isFirstRun) return (<Wrapper>{_t.pleaseFinishInstall}</Wrapper>);
  return false;
};

const mapStateToProps = state => (state);
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FirstRun);

