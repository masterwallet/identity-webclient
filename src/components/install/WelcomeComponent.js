import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  welcome: 'Welcome to Master Wallet',
  start: 'Start',
  ourMission: 'Our mission is to provide you full control over all of your crypto assets',
  pleaseFollowTheSteps: 'Please follow the steps for initializing this wallet software'
};

export const WelcomeComponent = () => {
  const menu = InstallationMenu;
  const step = 0;

  return (
    <WizardPanel title={_t.welcome}>
      <Next title={_t.start} to={menu[step + 1]} />

      <div style={{ marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
        <img style={{ width: 150, height: 163 }} src='/media/temp-wallet.png' alt='' />
      </div>
      <p style="text-align: center; font-weight: bold;">
        {_t.ourMission}
      </p>
      <p style="text-align: center; margin-top: 30px">
        {_t.pleaseFollowTheSteps}
      </p>

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
