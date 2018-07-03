import React from 'react';
import { WizardPanel } from './../panel/index';
import { Totals } from './../panel/Totals';
import { WalletsList } from './WalletsList';

const _t = {
  assetsOverview: 'Assets Overview',
  wallets: 'Wallets',
  accounts: 'Exchange Accounts'
};

export const AssetsOverviewComponent = ({ assets }) => (
  <WizardPanel title={_t.assetsOverview}>
    <Totals value={assets.total} currency="USD" />
    <WalletsList list={ assets.wallets } title={3 + ' ' + _t.wallets + ', 2 ' + _t.accounts} />
  </WizardPanel>
);
