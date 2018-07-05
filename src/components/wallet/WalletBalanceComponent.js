import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { WalletPanel, Totals } from './../panel/index';

const Send = styled.button`
  position: absolute;
  left: 135px;
  top: 65px;
  height: 70px;
  width: 70px;

  cursor: pointer;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  color: #252525;

  outline: none !important;

  border-radius: 50%;
  margin: 0px auto;
  border-left: none;
  border-right: none;
  border-top: 1px solid #6137bf;
  border-bottom: 1px solid #61c38b;
  box-shadow: 0px 0px 30px #cebdf1;
  background: transparent;

  &:hover {
    background: #efefef;
    color: #6c56f0;
  }
`;


const Receive = styled.button`
  position: absolute;
  left: -75px;
  top: 64px;
  height: 70px;
  width: 70px;

  cursor: pointer;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  color: #252525;

  outline: none !important;

  border-radius: 50%;
  margin: 0px auto;
  border-left: none;
  border-right: none;
  border-top: 1px solid #6137bf;
  border-bottom: 1px solid #61c38b;
  box-shadow: 0px 0px 30px #cebdf1;
  background: transparent;

  &:hover {
    background: #efefef;
    color: #6c56f0;
  }
`;


const _t = {
  receive: 'Receive',
  send: 'Send'
};

export const WalletBalanceComponent = ({ wallet }) => {
  const { id, address, network, name, icon } = wallet;
  const walletUrl = suffix => (`/wallets/${id}/${suffix}`);
  return (
    <WalletPanel {...{ id, address, name, network, icon }}>

      <Totals value={'1,144'} currency={'USD'}>
        <Link to={walletUrl('send')}>
          <Send>{_t.send}</Send>
        </Link>
        <Link to={walletUrl('receive')}>
          <Receive>{_t.receive}</Receive>
        </Link>
      </Totals>

      <br />
      TODO: transactions
      <br />
      <br />
      lorem ipsum
    </WalletPanel>
  );
}
