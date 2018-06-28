import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { FromFile } from './../../locale/index';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  welcome: 'Welcome to Master Wallet',
  start: 'Start'
};

export const WelcomeComponent = () => (
  <WizardPanel title={_t.welcome}>
    <Next title={_t.start} to={InstallationMenu[1]} />

    <div style={{ marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
      <img style={{ width: '50%', height: 'auto' }} src='/media/temp-wallet.png' alt='' />
    </div>
    <FromFile name="welcome.html" />
    
    <Steps {...{ step: 0, menu: InstallationMenu }} />
  </WizardPanel>
);
