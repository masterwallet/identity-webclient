import React from 'react';
import styled from 'styled-components';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import RadioButtonGroup from './../controls/RadioButtonGroup';
import { WizardPanel, Next } from './../panel/index';

const _t = {
  title: 'Choose Storage Type',
  thisIsFirstRun: 'This is your first launch. Please select what type of storage do you want:',
  createNewHd: 'Сreate HD Wallet',
  createNewHdExplained: 'HD Wallet is a hardened version of a wallet - ' +
    'you will not be allowed to import other private keys. ' +
    'Access to your funds could be restored just by secret seed phrase. ',
  restore: 'Restore HD Wallet',
  restoreExplained: 'Restore HD Wallet by entering 24 words seed',
  createNew: 'Сreate Encrypted Storage',
  createNewExplained: 'Encrypted storage allows you to have more functionality: ' +
    'in addition to wallet management and importing private keys from other wallets, ' +
    'you will be allowed to safely watch wallets without entering private keys or watch your balances on exchanges. ' +
    'Restoring access will require note only secret seed phrase and the backup file. ',

  restoreBackup: 'Restore Encrypted Storage',
  restoreBackupExplained: 'Restore Encrypted Storage from the backup file and 24 words seed phrase',
  accessRemote: 'Pair with ...',
  accessRemoteExplained: 'Connect to another device or service that is responsible for storing private keys and which will be signing transactions. ' +
    'Private keys will never be exchanged over the network',
  continue: 'Continue'
};

const options = [
  { label: _t.createNewHd, value: 'hdwallet', comment: _t.createNewHdExplained },
  { label: _t.createNew, value: 'encrypted', comment: _t.createNewExplained  },
  { label: _t.restore, value: 'restore', comment: _t.restoreExplained },
  { label: _t.restoreBackup, value: 'fromBackup', comment: _t.restoreBackupExplained },
  { label: _t.accessRemote, value: 'remote', comment: _t.accessRemoteExplained }
];

export const SelectStorageComponent = ({ setup }) => {
  const { serverStatus } = setup;
  const { isRunning } = serverStatus;
  return (
    <WizardPanel title={_t.title}>
      <Next title={_t.continue} to={InstallationMenu[4]} />
      <p style={{ textAlign: 'center' }}>{_t.thisIsFirstRun}</p>

      <RadioButtonGroup options={options} onChange={() => (false)} />
      <Steps {...{ step: 3, menu: InstallationMenu }} />
    </WizardPanel>
  );
};
