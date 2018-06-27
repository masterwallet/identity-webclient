import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { FromFile } from './../../locale';

export const WelcomeComponent = () => (
  <div>
    <FromFile name="welcome.html" />
    <Steps {...{ step: 0, menu: InstallationMenu }} />
  </div>
);
