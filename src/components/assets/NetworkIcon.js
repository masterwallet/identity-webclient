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
    display: flex;
    align-items: center;
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
    font-size: 7px;
    font-weight: bold;
    margin-top: 0px;
    background-color: black;
    color: white;
    padding-left: 3px;
    padding-right: 3px;
  }
`;

const getTestnet = () => { return 'TEST'; };

export const NetworkIcon = ({ network, icon, networkId, testnet, style, title = '' }) => {
  icon = network ? `networks/${network}.png` : (
    icon && icon.charAt(0) === '/' ? icon.substring(1) : icon
  );
  return (
    <IconDiv style={style}>
      {icon ? (<div className="icon"><img style={{ width: 32, height: 'auto' }} src={icon} alt="" /></div>) : false}
      <div className="network">
        <div style={{ flex: 1 }}>{ network }</div>
        {testnet ? <div className="testnet">{getTestnet({ network, networkId })}</div> : false}
      </div>
      {title ? <div className="title">{ title }</div> : false}

    </IconDiv>
  );
};
