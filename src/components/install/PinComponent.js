import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const PinComponent = () => (
  <div>
    Create PIN
    <Steps {...{ step: 7, menu: InstallationMenu }} />
  </div>
);
