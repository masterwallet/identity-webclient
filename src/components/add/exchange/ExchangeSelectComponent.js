import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';

export const ExchangeSelectComponent = () => (
  <div>
    Exchange SELECT (1/3)
    <Steps {...{ step: 0, menu: ExchangeMenu() }} />
  </div>
);
