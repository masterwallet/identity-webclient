import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { FromFile } from './../../locale';

export const PrivacyComponent = () => (
  <div>
    <FromFile name="privacy.html" />
    <Steps {...{ step: 2, menu: InstallationMenu }} />
  </div>
);
