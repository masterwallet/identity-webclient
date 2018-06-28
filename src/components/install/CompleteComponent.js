import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  isComplete: 'Installation Complete',
  congrats: 'Congratulations!',
  successfullyFinished: 'Set up was successfully finished.',
  nowYouCan: 'Now you can easily add wallets and manage them',
  start: 'Start'
};
export const CompleteComponent = () => (
  <WizardPanel title={_t.isComplete} wide={false}>
    <Next title={_t.start} to={'/add'} />

    <h4 style={{ textAlign: 'center', margin: '50px auto' }}>{_t.congrats}</h4>
    <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.successfullyFinished}</p>
    <p style={{ textAlign: 'center' }}>{_t.nowYouCan}</p>

    <Steps {...{ step: 9, menu: InstallationMenu }} />
  </WizardPanel>
);
