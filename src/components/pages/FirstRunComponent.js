import React from 'react';
import styled from 'styled-components';

const RadioButton = styled.button`
  display: block;
  width: 100%;
  text-align:center;
`;

const _t = {
  title: 'Please choose your storage',
  thisIsFirstRun: 'This is your first run of the wallet',
  createNew: 'Сreate New Encrypted Storage',
  restore: 'Restore from the Backup',
  accessRemote: 'Connect to Remote Storage',
  continue: 'Continue'
};

export const FirstRunComponent = ({ setup }) => {
  const isRunning = false;
  return (
    <div>
      <h1>{_t.title}</h1>
      <p>{_t.thisIsFirstRun}</p>
      <RadioButton disabled={!isRunning}>{_t.createNew}</RadioButton>
      <RadioButton disabled={!isRunning}>{_t.restore}</RadioButton>
      <RadioButton>{_t.accessRemote}</RadioButton>
      <button>{_t.continue}</button>
      <pre>{JSON.stringify(setup)}</pre>
    </div>
  );
};
