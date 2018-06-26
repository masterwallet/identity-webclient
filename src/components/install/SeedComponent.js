import React from 'react';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';

export const SeedComponent = () => (
  <div>
    Write Your Seed
    <Steps {...{ step: 5, menu: InstallationMenu }} />

  </div>
);
