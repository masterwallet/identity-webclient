import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu } from './../../../config/Wizards';

const network = 'eth';
export const ImportWalletInputComponent = () => (
  <div>
    Import: Please enter Private KEY (2/3)
    <Steps {...{ step: 1, menu: ImportMenu(network) }} />
  </div>
);
