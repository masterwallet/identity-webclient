import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const TermsComponent = () => (
  <div>
    Terms, lorem ipsum
    <Steps {...{ step: 1, menu: InstallationMenu }} />
  </div>
);
