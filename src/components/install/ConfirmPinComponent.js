import React from 'react';
import { Steps } from './../controls/Steps';
import { PinCode } from './../controls/PinCode';
import { InstallationMenu } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  confirmPin: 'Confirm PIN',
  please: 'Please confirm that you\'ve remembered the PIN.',
  itWillBeRequired: 'It will be required for quick access to your funds.',
  finish: 'Finish'
};

export const ConfirmPinComponent = ({ install, onUpdatePin }) => (
  <WizardPanel title={_t.confirmPin} wide={true}>
    {install.pinCodeConfirm.length === 4 ? <Next title={_t.finish} to={InstallationMenu[9]} /> : false}

    <p style={{ textAlign: 'center', marginBottom: 0, marginTop: 30 }}>{_t.please}</p>
    <p style={{ textAlign: 'center' }}>{_t.itWillBeRequired}</p>

    <PinCode value={install.pinCodeConfirm} onChange={onUpdatePin} />
    <Steps {...{ step: 8, menu: InstallationMenu }} />
  </WizardPanel>
);
