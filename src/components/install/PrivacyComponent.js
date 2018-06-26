import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const PrivacyComponent = () => (
  <div>
    Privacy Policy
    <Steps {...{ step: 2, menu: InstallationMenu }} />
  </div>
);
