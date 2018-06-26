import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu } from './../../../config/Wizards';

const network = 'eth';
export const WatchWalletCompleteComponent = () => (
  <div>
    Wallet was added to the watchlist (3/3)
    <Steps {...{ step: 2, menu: WatchMenu(network) }} />
  </div>
);
