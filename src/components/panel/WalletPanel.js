import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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


const ChveronLeft = () => (
  <svg viewBox="0 0 256 512"  style={{ width: 10, transform: "scale(-1,1)" }}>
    <path fill="currentColor" d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z" />
  </svg>
);


const ButtonWrapper = styled.div`
  position: fixed;
  z-index: 1001;
  left: 5px;
  top: 15px;

  a.btn {
    display: flex;
    align-items: center;

    background: transparent;
    font-weight: bold;
    color: #262327;
    border-top: 1px #6239bf solid;
    border-bottom: 1px #61c38b solid;

    border-radius: 0px;
  }
  a.btn:hover {
    opacity: 0.9;
    background: #fff;
    color: #6b4afa;
    border-top: 1px #61c38b solid;
    border-bottom: 1px #6239bf solid;
  }

  a .title { margin-left: 15px; }
  @media(max-width: 480px) {
    a .title {
      display: none;
    }
  }
`;

export const BackButton = ({ title, to, disabled = false }) => (
  <ButtonWrapper>
    <Link disabled={disabled} to={to} className="btn btn-primary btn-sm">
      <ChveronLeft />
      <span className="title">{title}</span>
    </Link>
  </ButtonWrapper>
);

const _t = {
  backToWallet: 'Back to Wallet'
};

export const WalletPanel = ({ name, address, network, icon, children, back = false }) => (
  <Wrapper>
    <div className="top">
      <ButtonWrapper>
        <Link to={`/wallets/${address}/balance`} className="btn btn-primary btn-sm">
          <ChveronLeft />
          <span className="title">{_t.backToWallet}</span>
        </Link>
      </ButtonWrapper>
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
