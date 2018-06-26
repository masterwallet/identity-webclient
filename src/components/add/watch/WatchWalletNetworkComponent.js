import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu } from './../../../config/Wizards';

export const WatchWalletNetworkComponent = () => (
  <div>
    Watch Wallet: Select Network (1/3)
    <Steps {...{ step: 0, menu: WatchMenu() }} />
  </div>
);
