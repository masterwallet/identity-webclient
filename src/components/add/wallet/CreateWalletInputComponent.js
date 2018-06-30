import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';

const network = 'eth';
export const CreateWalletInputComponent = () => (
  <div>
    Create Wallet: MAKE SOME NOISE? (2/3)
    <Steps {...{ step: 2, menu: CreateMenu(network) }} />
  </div>
);
