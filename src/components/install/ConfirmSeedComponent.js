import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const ConfirmSeedComponent = () => (
  <div>
    Confirm Your Seed
    <Steps {...{ step: 6, menu: InstallationMenu }} />

  </div>
);
