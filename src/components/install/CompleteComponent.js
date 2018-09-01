import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  isComplete: 'Installation Complete',
  congrats: 'Congratulations!',
  successfullyFinished: 'Set up was successfully finished.',
  nowYouCan: 'Now you can easily add wallets and manage them',
  start: 'Start'
};
export const CompleteComponent = () => {
  const menu = InstallationMenu;
  const step = findWizardStep(menu, '/complete');
  return (
    <WizardPanel title={_t.isComplete} wide={false}>
      <Next title={_t.start} to={'/add'} />

      <div style={{ margin: '20px auto', textAlign: 'center' }}>
        <img src='media/applause.png' alt='' style={{ width: 210, height: 210 }} />
        <h4 style={{ textAlign: 'center'}}>{_t.congrats}</h4>
        <p style={{ textAlign: 'center', marginBottom: 0, fontWeight: 'bold' }}>{_t.successfullyFinished}</p>
      </div>
      <p style={{ textAlign: 'center' }}>{_t.nowYouCan}</p>

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
