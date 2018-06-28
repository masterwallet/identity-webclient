import React from 'react';
import styled from 'styled-components';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  pleaseWrite: 'Please Write 24 Secret Words',
  importance: 'This is the most important step. ' +
    'Please write down your 24 words and keep them in safe place where no one can access them.' +
    'These words will allow you to restore access to your funds.',
  iWroteIt: 'I wrote it'
};

const Centered = styled.div`
  text-align:center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Word = styled.div`
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  background: #e6e1f1;
  opacity: 0.9;
  color: #8d66fe;
  border-top: 1px #ccc solid;
  border-left: 1px #fff solid;
  border-right: 1px #fff solid;

  border-radius: 5px;
  margin-bottom: 5px;
  padding-left: 10px;
  margin-left: 5px;
  margin-right: 5px;
  user-select: none;
  flex: 0;
  font-weight: bold;

  .index {
    color: #777;
    width: 28px;
    display: inline-block;
    text-align: center;
  }
`;

const WordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const words = [
  'ring', 'crime', 'symptom', 'enough', 'erupt', 'lady', 'behave', 'ramp', 'apart', 'settle', 'citizen', 'junk',
  'ring', 'crime', 'symptom', 'enough', 'erupt', 'lady', 'behave', 'ramp', 'apart', 'settle', 'citizen', 'junk'
];

export const SeedComponent = () => (
  <WizardPanel title={_t.pleaseWrite} wide={true}>
    <Next title={_t.iWroteIt} to={InstallationMenu[6]} />
    <Centered>{_t.importance}</Centered>
    <WordList>
      {words.map((word, index) => (
        <Word key={index}><span className="index">{index + 1}.</span> {word}</Word>
      ))}
    </WordList>
    <Steps {...{ step: 5, menu: InstallationMenu }} />
  </WizardPanel>
);
