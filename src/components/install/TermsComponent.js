import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { FromFile } from './../../locale/index';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  terms: 'Terms and Services',
  accept: 'Accept'
};

export const TermsComponent = () => (
  <WizardPanel title={_t.terms} wide={true}>
    <Next title={_t.accept} to={InstallationMenu[2]} />
    <FromFile name="terms.html" />
    <Steps {...{ step: 1, menu: InstallationMenu }} />
  </WizardPanel>
);
