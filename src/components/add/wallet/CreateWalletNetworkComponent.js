import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { NetworkSelector } from './../../controls/NetworkSelector';

const _t = {
  selectNetwork: 'New Wallet: Select Network',
  continue: 'Continue'
};

export const CreateWalletNetworkComponent = ({ add, onUpdateNetwork, onUpdateTestnet }) => {
  const { network, testnet } = add.create;
  const menu = CreateMenu(network, testnet);
  const step = 0;

  return (
    <WizardPanel title={_t.selectNetwork}>
      {network ? <Next to={menu[step + 1]} title={_t.continue} /> : false}
      <NetworkSelector
        value={network} onChange={onUpdateNetwork} 
        isTestNet={testnet}
        onTestNet={onUpdateTestnet}
      />
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}

