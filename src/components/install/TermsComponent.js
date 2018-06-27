import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { FromFile } from './../../locale';
import { WizardPanel } from './../panel/WizardPanel';

const _t = {
  terms: 'Terms and Services'
};

export const TermsComponent = () => (
  <WizardPanel title={_t.terms} wide={true}>
    <FromFile name="terms.html" />
    <Steps {...{ step: 1, menu: InstallationMenu }} />
  </WizardPanel>
);
