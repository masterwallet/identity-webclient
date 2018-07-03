import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { WizardPanel } from './../panel/index';
import { Totals } from './../panel/Totals';
import { WalletsList } from './WalletsList';

const _t = {
  assetsOverview: 'Assets Overview',
  wallets: 'Wallets',
  accounts: 'Exchange Accounts',
  assets: 'Assets'
};

const MyAssets = styled.button`
  position: absolute;
  left: 155px;
  top: 0px;
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

// const Ruler = () => (<div style={{ background: '#444', width: '100%', height: 3 }}></div>);

export const AssetsOverviewComponent = ({ assets }) => (
  <WizardPanel title={_t.assetsOverview}>
    <Totals value={assets.total} currency="USD">
      <Link to='/assets/combined'><MyAssets>{_t.assets}</MyAssets></Link>
    </Totals>
    <WalletsList list={ assets.wallets } title={3 + ' ' + _t.wallets + ', 2 ' + _t.accounts} />
  </WizardPanel>
);
