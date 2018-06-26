import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const ConfirmPinComponent = () => (
  <div>
    Confirm PIN
    <Steps {...{ step: 8, menu: InstallationMenu }} />
  </div>
);
