import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Steps } from './../controls/Steps';
import { PinCode } from './../controls/PinCode';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { WizardPanel, Next, Prev } from './../panel/index';
// import { ErrorBox } from './../panel/ErrorBox';
import ReadyRedirect from './../../containers/layout/ReadyRedirect';


const _t = {
  confirmPin: 'Confirm PIN',
  please: 'Please confirm that you\'ve remembered the PIN.',
  itWillBeRequired: 'It will be required for quick access to your funds.',
  finish: 'Finish',
  pinMismatch: 'PIN confirmation doesn\'t match original',
  back: 'Back'
};

const ErrorTitle = styled.div`
  color: red;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
`;

export const ConfirmPinComponent = ({ install, onUpdatePin, onContinue, onSubmit }) => {
  const menu = InstallationMenu;
  const step = findWizardStep(menu, '/confirm/pin');
  const { pinCodeConfirm, pinCodeLength, pinCode, isLoading, entropy } = install;
  const mismatch = pinCodeConfirm.length === pinCodeLength && pinCode !== pinCodeConfirm;
  const onComplete = value => {
    const match = pinCode === value;
    if (match) {
      // onContinue(menu[step + 1]);
    }
  };
  const disabled = pinCodeConfirm.length !== pinCodeLength ||
                   pinCode !== pinCodeConfirm;
  if (!entropy.getWords()) { return <Redirect to={menu[step-1]} />; }

  return (
    <WizardPanel title={_t.confirmPin} wide={true}>
      <ReadyRedirect />
      <Next
        title={_t.finish} to={menu[step + 1]} {...{ disabled, isLoading }}
        onClick={() => onSubmit(install)}
      />
      <Prev title={_t.back} to={menu[step - 1]} />

      <p style={{ textAlign: 'center', marginBottom: 0, marginTop: 30 }}>{_t.please}</p>
      <p style={{ textAlign: 'center' }}>{_t.itWillBeRequired}</p>
      {isLoading ? false : (
        <PinCode
          error={mismatch}
          value={pinCodeConfirm} length={pinCodeLength}
          onChange={onUpdatePin}
          onComplete={onComplete}
        />
      )}
      {mismatch ? (<ErrorTitle>{_t.pinMismatch}</ErrorTitle>) : false}

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
