import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const WelcomeComponent = () => (
  <div>
    Welcome
    <Steps {...{ step: 0, menu: InstallationMenu }} />
  </div>
);
