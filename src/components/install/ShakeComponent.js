import React from 'react';
import styled from 'styled-components';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  generate: 'Generate Some Randomness',
  pleaseShakeDesktop: 'Please move your mouse cursor to strengthen your future password',
  start: 'Continue'
};

const Centered = styled.div`
  text-align:center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

export const ShakeComponent = () => (
  <WizardPanel title={_t.generate}>
    <Next title={_t.start} to={InstallationMenu[5]} />
    <Centered>{_t.pleaseShakeDesktop}</Centered>
    <Steps {...{ step: 4, menu: InstallationMenu }} />
  </WizardPanel>
);
