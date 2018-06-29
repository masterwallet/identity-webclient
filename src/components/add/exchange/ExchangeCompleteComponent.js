import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';

const _t = {
  success: 'Exchange Account Was Added',
  accountWasAdded: 'Access to exchange account was verified and added to the wallet for monitoring.',
  myAssets: 'My Assets'
};

export const ExchangeCompleteComponent = () => (
  <WizardPanel title={_t.success}>
    <Next to={`/assets/overview`} title={_t.myAssets} />      
    <p style={{ textAlign: 'center', marginTop: 20 }}>{_t.accountWasAdded}</p>
    <Steps {...{ step: 2, menu: ExchangeMenu() }} />
  </WizardPanel>
);
