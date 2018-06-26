import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu } from './../../../config/Wizards';

const network = 'eth';
export const ImportWalletCompleteComponent = () => (
  <div>
    Wallet was Imported (3/3)
    <Steps {...{ step: 2, menu: ImportMenu(network) }} />
  </div>
);
