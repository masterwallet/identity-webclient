import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { FromFile } from './../../locale/index';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  privacy: 'Privacy Policy',
  accept: 'Accept'
};
export const PrivacyComponent = () => (
  <WizardPanel title={_t.privacy} wide={true}>
    <Next title={_t.accept} to={InstallationMenu[3]} />
    <FromFile name="privacy.html" />
    <Steps {...{ step: 2, menu: InstallationMenu }} />
  </WizardPanel>
);
