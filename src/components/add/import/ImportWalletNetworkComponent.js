import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { NetworkSelector } from './../../controls/NetworkSelector';

const _t = {
  selectNetwork: 'Import Wallet: Select Network',
  continue: 'Continue',
  back: 'Back'
};

export const ImportWalletNetworkComponent = ({ section, add, setup, onUpdateNetwork, onUpdateTestnet }) => {
  const { network, testnet } = add[section];
  const { networksConfig } = setup;
  const menu = ImportMenu({ network, testnet, networksConfig });
  if (!menu) return false;
  const step = 0;
  const canContinue = !!network;
  return (
    <WizardPanel title={_t.selectNetwork}>
      <Next to={menu[step + 1]} title={_t.continue} disabled={!canContinue} />
      <Prev to='/add' title={_t.back} />

      <NetworkSelector value={network}
        {...{section, networksConfig}}
        onChange={onUpdateNetwork}
        isTestNet={testnet}
        onTestNet={onUpdateTestnet} />

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}
