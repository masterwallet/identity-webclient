import React from 'react';
import { Steps } from './../controls/Steps';
import { Redirect } from 'react-router-dom';
import { PinCode } from './../controls/PinCode';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { WizardPanel, Next, Prev } from './../panel/index';

const _t = {
  createPin: 'Create PIN',
  usage: 'PIN code encrypts your seed key and provides you temporary access to the wallet.',
  willBeRequired: 'It will be required for unlocking the wallet.',
  continue: 'Continue',
  back: 'Back'
};

export const PinComponent = ({ install, onUpdatePin, onContinue }) => {
  const menu = InstallationMenu;
  const step = findWizardStep(menu, '/pin');
  const onComplete = () => (onContinue(menu[step + 1]));
  const { entropy, pinCode, pinCodeLength } = install;
  if (!entropy.getWords()) { return <Redirect to={menu[step-1]} />; }
  const canContinue = (pinCode.length === pinCodeLength);

  return (
    <WizardPanel title={_t.createPin} wide={true}>
      <Next title={_t.continue} to={menu[step + 1]} disabled={!canContinue} />
      <Prev title={_t.back} to={menu[step - 1]} />

      <p style={{ textAlign: 'center', marginBottom: 0, marginTop: 30 }}>{_t.usage}</p>
      <p style={{ textAlign: 'center' }}>{_t.willBeRequired}</p>

      <PinCode value={pinCode} length={pinCodeLength} onChange={onUpdatePin} onComplete={onComplete} />

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}
