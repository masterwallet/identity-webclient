import React from 'react';
import styled from 'styled-components';

const RadioButton = styled.button`
  display: block;
  width: 100%;
  text-align:center;
  cursor: pointer;
  margin-bottom: 10px;
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
    <div className="container-fluid">
      <h1>{_t.title}</h1>
      <p>{_t.thisIsFirstRun}</p>
      <RadioButton className='btn btn-lg btn-default' disabled={!isRunning}>{_t.createNew}</RadioButton>
      <RadioButton className='btn btn-lg btn-default' disabled={!isRunning}>{_t.restore}</RadioButton>
      <RadioButton className='btn btn-lg btn-primary'>{_t.accessRemote}</RadioButton>
      <button className='btn btn-lg btn-success' >{_t.continue}</button>
      <pre>{JSON.stringify(setup, null, 2)}</pre>
    </div>
  );
};
