import React from 'react';
import { Steps } from './../controls/Steps';
import { PinCode } from './../controls/PinCode';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  confirmPin: 'Confirm PIN',
  please: 'Please confirm that you\'ve remembered the PIN.',
  itWillBeRequired: 'It will be required for quick access to your funds.',
  finish: 'Finish'
};

export const ConfirmPinComponent = ({ install, onUpdatePin, onContinue }) => {
  const menu = InstallationMenu;
  const step = findWizardStep(menu, '/confirm/pin');
  const onComplete = () => (onContinue(menu[step + 1]));
  return (
    <WizardPanel title={_t.confirmPin} wide={true}>
      {install.pinCodeConfirm.length === install.pinCodeLength ? <Next title={_t.finish} to={menu[step + 1]} /> : false}

      <p style={{ textAlign: 'center', marginBottom: 0, marginTop: 30 }}>{_t.please}</p>
      <p style={{ textAlign: 'center' }}>{_t.itWillBeRequired}</p>

      <PinCode
        value={install.pinCodeConfirm} length={install.pinCodeLength}
        onChange={onUpdatePin}
        onComplete={onComplete}
      />
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
