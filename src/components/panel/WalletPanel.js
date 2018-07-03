import React from 'react';
import styled from 'styled-components';
import { JDentIcon } from './../jdenticon/index';
import { NetworkIcon } from './../assets/NetworkIcon';

const Wrapper = styled.div`
  padding-left: 0px;
  padding-right: 0px;
  .top {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1000;
    width: 100%;

    text-align: center;
    border-bottom: 1px #ba9ef4 solid;
    background: #e7e1f1;
    padding: 5px;
    box-shadow: 0px 2px 10px #d9cef0;
    font-size: 20px;
    color: #262329;
  }
  @media(max-width: 480px) {
    .top { font-size: 16px; }
  }
  
  .name {
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    text-shadow: 2px 2px 10px #fff;
    text-align: left;
    color: #338f81;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 185px;
    padding-left: 10px;
  }
  .address {
    font-size: 11px;
    text-align: left;
    margin-left: 10px;
    font-family: monospace;
    color: #888;
    text-shadow: #61c38b;
  }

  .lc { 
    position: fixed;
    left: 0px;
    top: 0px;
    width: 50px;
  }
`;
const Spacer = styled.div`
  height: 75px;
`;
  
const shortAddress = (value) => (value.substring(0, 6) + " ... " + value.substring(value.length - 10));
  
export const WalletPanel = ({ name, address, network, icon, children }) => (
  <Wrapper>
    <div className="top">
      <div className="lc">
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: 300, margin: '0px auto' }}>
        <div style={{ width: 50 }}>
          <NetworkIcon network={network} icon={icon} />
        </div>
        <JDentIcon size={40} value={address} style={{ background: 'white' }} />
        <div className="main">
          <div className="name">{name}</div>
          <div className="address">{shortAddress(address)}</div>
        </div>
      </div>
    </div>          
    <Spacer />
    <div style={{ width: 300, margin: '0px auto', textAlign: 'justify' }}>
      {children}
    </div>
    <Spacer />
  </Wrapper>
);
