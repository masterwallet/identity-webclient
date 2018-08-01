import React from 'react';
import styled from 'styled-components';

const IconDiv = styled.div`
  .network {
    width: 50px;
    font-size: 9px;
    font-weight: bold;
    color: #222;
    text-align: center;
    text-shadow: 2px 2px 10px #fff;
  }
  .icon {
    text-align: center;
    margin-top: 5px;
  }
  .title {
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    margin-top: 0px;
  }
  .testnet {
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    margin-top: 0px;
    background-color: darkred;
    color: white;
  }
`;

const getTestnet = () => {
  return 'Test Net';
};

export const NetworkIcon = ({ network, networkId, testnet, icon, style, title = '' }) => (
  <IconDiv style={style}>
    {icon ? (<div className="icon"><img style={{ width: 32, height: 'auto' }} src={icon} alt="" /></div>) : false}
    <div className="network">{ network }</div>
    {title ? <div className="title">{ title }</div> : false}
    {testnet ? <div className="testnet">{getTestnet({ network, networkId })}</div> : false}
  </IconDiv>
);
