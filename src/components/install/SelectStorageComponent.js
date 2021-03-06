import React from 'react';
// import styled from 'styled-components';
import { Steps } from './../controls/Steps';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import TextInput from './../controls/TextInput';
import RadioButtonGroup from './../controls/RadioButtonGroup';
import { WizardPanel, Next, Prev } from './../panel/index';
import ReadyRedirect from './../../containers/layout/ReadyRedirect';

const _t = {
  title: 'Choose Storage Type',
  thisIsFirstRun: 'Please select what type of storage do you want to create:',
  createNewHd: 'Сreate HD Wallet',
  createNewHdExplained: 'HD Wallet is a hardened version of a wallet - ' +
    'you will not be allowed to import other private keys. ' +
    'Access to your funds could be restored just by secret seed phrase. This is an industry standard and a recommended version for hot wallets.',
  restore: 'Restore HD Wallet',
  restoreExplained: 'Restore HD Wallet by entering 24 words seed',
  createNew: 'Сreate Encrypted Storage',
  createNewExplained: 'Encrypted storage allows you to have rich functionality: ' +
    'in addition to wallet management and importing private keys from other wallets, ' +
    'you will be allowed to safely watch wallets without entering private keys or watch your balances on exchanges. ' +
    'Restoring access will require note only secret seed phrase but also the backup file. ',

  restoreBackup: 'Restore Encrypted Storage',
  restoreBackupExplained: 'Restore Encrypted Storage from the backup file and 24 words seed phrase',
  accessRemote: 'Pair with ...',
  accessRemoteExplained: 'Connect to another device or service that is responsible for storing private keys and which will be signing transactions. ' +
    'Private keys will never be exchanged over the network',
  continue: 'Continue',
  back: 'Back'
};

export const SelectStorageComponent = ({ setup, install, onUpdate, onUpdatePair }) => {
  // const { serverStatus } = setup;
  // const { isRunning } = serverStatus;
  const { storage, pair, isValidStorage, isValidRemote } = install;

  const options = [
    { label: _t.createNew, value: 'encrypted', comment: _t.createNewExplained  },
    { label: _t.createNewHd, value: 'hdwallet', comment: _t.createNewHdExplained },
    { label: _t.accessRemote, value: 'remote', disabled: true,
      comment: [
        <div key={1}>{_t.accessRemoteExplained}</div>,
        (storage === 'remote') ? <TextInput key={2} className={isValidRemote ? '' : 'invalid'} style={{ marginTop: 5, marginBottom: 5 }} value={pair} onChange={onUpdatePair} /> : false
      ]
    },
    { label: _t.restoreBackup, value: 'fromBackup', comment: _t.restoreBackupExplained, disabled: true },
    { label: _t.restore, value: 'restore', comment: _t.restoreExplained, disabled: true }
  ];

  const menu = InstallationMenu;
  const step = findWizardStep( menu, '/storage');

  return (
    <WizardPanel title={_t.title}>
      <ReadyRedirect />
      <Next title={_t.continue} disabled={!isValidStorage} to={menu[step + 1]} />
      <Prev title={_t.back} to={menu[step - 1]} />
      <p style={{ textAlign: 'center' }}>{_t.thisIsFirstRun}</p>

      <RadioButtonGroup value={storage} options={options} onChange={onUpdate} />
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
