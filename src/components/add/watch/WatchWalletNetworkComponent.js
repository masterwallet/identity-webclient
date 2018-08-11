import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { NetworkSelector } from './../../controls/NetworkSelector';

const _t = {
  selectNetwork: 'Wallet Watch: Select Network',
  continue: 'Continue',
  back: 'Back'
};


export const WatchWalletNetworkComponent = ({ section, add, setup, onUpdateNetwork, onUpdateTestnet }) => {
  const { network, testnet } = add[section];
  const { networksConfig } = setup;
  const menu = WatchMenu({ network, testnet, networksConfig });
  if (!menu) return false;

  const step = 0;
  const canContinue = network; // && !disabled?
  return (
    <WizardPanel title={_t.selectNetwork}>
      <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />
      <Prev to='/wallets' title={_t.back} />
      <NetworkSelector
        {...{ section, networksConfig }}
        value={network} onChange={onUpdateNetwork}
        isTestNet={testnet} onTestNet={onUpdateTestnet}
      />
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );

};
