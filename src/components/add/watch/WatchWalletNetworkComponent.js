import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { NetworkSelector } from './../../controls/NetworkSelector';

const _t = {
  selectNetwork: 'Wallet Watch: Select Network',
  continue: 'Continue'
};

export const WatchWalletNetworkComponent = ({ add, onUpdateNetwork, onUpdateTestnet }) => {
  const { network, testnet } = add.watch;
  const menu = WatchMenu(network, testnet);
  const step = 0;
  return (
    <WizardPanel title={_t.selectNetwork}>
      {network ? <Next to={menu[step + 1]} title={_t.continue} /> : false}
      <NetworkSelector 
        value={network} onChange={onUpdateNetwork} 
        isTestNet={testnet} onTestNet={onUpdateTestnet}
      />
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );

}
