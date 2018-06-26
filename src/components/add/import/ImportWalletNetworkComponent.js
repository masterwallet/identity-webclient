import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu } from './../../../config/Wizards';

export const ImportWalletNetworkComponent = () => (
  <div>
    Import Wallet: Select Network (1/3)
    <Steps {...{ step: 0, menu: ImportMenu() }} />
  </div>
);
