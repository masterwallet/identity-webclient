import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu } from './../../../config/Wizards';

const network = 'eth';
export const WatchWalletInputComponent = () => (
  <div>
    Watch Wallets: Please enter Public KEY (2/3)
    <Steps {...{ step: 1, menu: WatchMenu(network) }} />
  </div>
);
