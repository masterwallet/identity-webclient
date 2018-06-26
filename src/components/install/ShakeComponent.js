import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const ShakeComponent = () => (
  <div>
    Shake it!
    <Steps {...{ step: 4, menu: InstallationMenu }} />
  </div>
);
