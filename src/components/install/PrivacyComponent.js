import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { FromFile } from './../../locale/index';
import { WizardPanel, Next, Prev } from './../panel/index';

const _t = {
  privacy: 'Privacy Policy',
  accept: 'Accept',
  back: 'Back'
};

export const PrivacyComponent = () => {
  const menu = InstallationMenu;
  const step = findWizardStep(menu, '/privacy');

  return (
    <WizardPanel title={_t.privacy} wide={true}>
      <Next title={_t.accept} to={menu[step + 1]} />
      <Prev title={_t.back} to={menu[step - 1]} />

      <FromFile name="privacy.html" />
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}