import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';

const exchange ='kucoin';
export const ExchangeCompleteComponent = () => (
  <div>
    Exchange Account Added (3/3)
    <Steps {...{ step: 2, menu: ExchangeMenu(exchange) }} />
  </div>
);
