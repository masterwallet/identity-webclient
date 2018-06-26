import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';

const exchange = 'kucoin';
export const ExchangeInputComponent = () => (
  <div>
    Exchange INPUT KEYS (2/3)
    <Steps {...{ step: 1, menu: ExchangeMenu(exchange) }} />
  </div>
);
