import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { FromFile } from './../../locale/index';
import { WizardPanel, Next, Prev } from './../panel/index';
import ReadyRedirect from './../../containers/layout/ReadyRedirect';

const _t = {
  terms: 'Terms and Services',
  accept: 'Accept',
  back: 'Back'
};

export const TermsComponent = () => {
  const menu = InstallationMenu;
  const step = findWizardStep(menu, '/terms');
  return (
    <WizardPanel title={_t.terms} wide={true}>
      <ReadyRedirect />
      <Next title={_t.accept} to={menu[step + 1]} />
      <Prev title={_t.back} to={menu[step - 1]} />
      <FromFile name="terms.md" />
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
