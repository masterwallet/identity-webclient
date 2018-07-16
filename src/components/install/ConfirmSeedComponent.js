import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from './../controls/TextInput';
import { Steps } from './../controls/Steps';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { WizardPanel, Next, Prev } from './../panel/index';

const _t = {
  pleaseConfirm: 'Confirm Your Seed Phrase',
  importance: 'Please confirm you\'ve written down your seed phrase by entering its words:',
  checkIt: 'Check it',
  word: 'Word',
  back: 'Back'
};

const Centered = styled.div`
  text-align:center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Legend = styled.span`
  background: none;
  color: darkmagenta;
  border: none;
  font-size: 12px;
  font-weight: bold;
  width: 90px;
`;

const InputWord = ({ autofocus, index, value, onChange }) => (
  <div className="input-group-prepend" style={{ marginBottom: 10 }}>
    <Legend className="input-group-text">{_t.word} #{index}:</Legend>
    <TextInput maxLength={20} style={{ width: '100%' }} {...{value, autofocus, onChange}} />
  </div>
);

export class ConfirmSeedComponent extends React.Component {
  componentWillMount() {
    const { install } = this.props;
    const { dictionary } = install;
    if (!dictionary || !dictionary.length) {
      this.props.onInit();
    }
  }
  render() {
    const { install } = this.props;
    if (!install.entropy.isValid()) return <Redirect to='/shake' />;
    const words = install.entropy.getWords().split(" ");
    const { wordsEntered, wordsIndexes } = install;

    const menu = InstallationMenu;
    const step = findWizardStep(menu, '/confirm/seed');
    return (
      <WizardPanel title={_t.pleaseConfirm}>
        <Next title={_t.checkIt} to={menu[step + 1]}/>
        <Prev title={_t.back} to={menu[step - 1]} />

        <Centered>{_t.importance}</Centered>
        {wordsIndexes.map((wordIndex, index) => (
          <InputWord
            autofocus={index === 0}
            key={wordIndex} index={wordIndex+1} value={wordsEntered[index]}
            expectedValue={words[wordIndex]}
            onChange={value => this.props.onChange({ index, value })}
          />
        ))}

        <div style={{ fontSize: 10, wordBreak: 'break-word' }}>
          {JSON.stringify(words)}
        </div>
        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  }
}
