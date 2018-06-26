import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const CompleteComponent = () => (
  <div>
    Complete
    <Steps {...{ step: 9, menu: InstallationMenu }} />

  </div>
);
