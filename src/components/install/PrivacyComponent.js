import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { FromFile } from './../../locale/index';
import { WizardPanel } from './../panel/WizardPanel';

const _t = {
  privacy: 'Privacy Policy'
};
export const PrivacyComponent = () => (
  <WizardPanel title={_t.privacy} wide={true}>
    <FromFile name="privacy.html" />
    <Steps {...{ step: 2, menu: InstallationMenu }} />
  </WizardPanel>
);
