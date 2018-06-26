import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';

const network = 'eth';
export const CreateWalletCompleteComponent = () => (
  <div>
    Wallet was Created (3/3)
    <Steps {...{ step: 2, menu: CreateMenu(network) }} />
  </div>
);
