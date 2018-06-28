import React from 'react';
import { Steps } from './../controls/Steps';
import { PinCode } from './../controls/PinCode';
import { InstallationMenu } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  createPin: 'Create PIN',
  usage: 'PIN code encrypts your seed key and provides you temporary access to the wallet.',
  willBeRequired: 'It will be required for unlocking the wallet.',
  continue: 'Continue'
};

export const PinComponent = () => (
  <WizardPanel title={_t.createPin} wide={true}>
    <Next title={_t.continue} to={InstallationMenu[8]} />
    <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.usage}</p>
    <p style={{ textAlign: 'center' }}>{_t.willBeRequired}</p>

    <PinCode />

    <Steps {...{ step: 7, menu: InstallationMenu }} />
  </WizardPanel>
);
