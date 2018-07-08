import React from 'react';
import styled from 'styled-components';

import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  pleaseConfirm: 'Confirm Your Seed Phrase',
  importance: 'Please confirm you\'ve written down your seed phrase by entering its words:',
  checkIt: 'Check it',
  word: 'Word'
};

const Centered = styled.div`
  text-align:center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InputWord = ({ index }) => (
  <div className="input-group-prepend" style={{ marginBottom: 10 }}>
    <span className="input-group-text">{_t.word} #{index}:</span>
    <input type="text" style={{ width: '100%' }}/>
  </div>
);

// TODO:
//componentWillMount() {
//  const { install } = this.props;
//  const { dictionary } = install;
//  if (!dictionary || !dictionary.length) {
//    this.props.onInit();
//  }
export const ConfirmSeedComponent = () => (
  <WizardPanel title={_t.pleaseConfirm}>
    <Next title={_t.checkIt} to={InstallationMenu[7]} />
    <Centered>{_t.importance}</Centered>

    <InputWord index="21" />
    <InputWord index="13" />
    <InputWord index="10" />

    <Steps {...{ step: 6, menu: InstallationMenu }} />
  </WizardPanel>
);
