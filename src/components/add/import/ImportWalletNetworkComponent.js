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

export const ImportWalletNetworkComponent = ({ section, add, onUpdateNetwork, onUpdateTestnet }) => {
  const { network, testnet } = add[section];
  const menu = ImportMenu(network, testnet);
  const step = 0;
  const canContinue = !!network;
  return (
    <WizardPanel title={_t.selectNetwork}>
      <Next to={menu[step + 1]} title={_t.continue} disabled={!canContinue} />
      <Prev to='/add' title={_t.back} />

      <NetworkSelector value={network}
        section={section}
        onChange={onUpdateNetwork}
        isTestNet={testnet}
        onTestNet={onUpdateTestnet} />

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}
