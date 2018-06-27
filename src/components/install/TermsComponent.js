import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { FromFile } from './../../locale';

export const TermsComponent = () => (
  <div>
    <FromFile name="terms.html" />
    <Steps {...{ step: 1, menu: InstallationMenu }} />
  </div>
);
