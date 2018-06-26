import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';

export const CreateWalletNetworkComponent = () => (
  <div>
    Create Wallet: Select Network (1/3)
    <Steps {...{ step: 0, menu: CreateMenu() }} />
  </div>
);
