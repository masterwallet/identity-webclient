import React from 'react';
import styled from 'styled-components';

const _t = {
  serverIsNotAvailable: 'Identity/Wallet backend is not available'
};

export const ErrorBox = styled.div`
  background: #ffcccc;
  opacity: 0.75;
  position: absolute;
  top: 10px;
  left: 0px;
  width: 100%;

  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: darkred;
  text-align: center;

  border-bottom: darkred;
  box-shadow: 0px 2px 10px darkred;

`;

export const ErrorStatus = ({ message }) => {
  if (typeof message === 'string') {
    if (message === 'TypeError: Failed to fetch') {
      return (<ErrorBox>{_t.serverIsNotAvailable}</ErrorBox>);
    }
    return (<ErrorBox>{message}</ErrorBox>);
  }
  if (typeof message === 'object') {
    if (message.message) return (<ErrorBox>{message.message}</ErrorBox>);
    if (message.code) return (<ErrorBox>{message.code}</ErrorBox>);
    if (message.reason) return (<ErrorBox>{message.reason}</ErrorBox>);
  }
  return false;
};

export default {
  ErrorBox,
  ErrorStatus
};
