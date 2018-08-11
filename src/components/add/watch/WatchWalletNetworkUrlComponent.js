import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { TestnetSelector } from './../../assets/TestnetSelector';
import { isValidUrl } from './../../../services/Url';

const _t = {
  customRpcUrl: 'Custom RPC URL',
  useCustomNetwork: 'Use custom network RPC URL:',
  continue: 'Continue',
  back: 'Back'
};

export const WatchWalletNetworkUrlComponent = ({ add, section, onUpdateNetworkId, onUpdateRpcRoot }) => {
  const { network, testnet, networkId, rpcRoot } = add[section];
  const menu = WatchMenu(network, testnet);
  if (!menu) return false;

  const step = findWizardStep(menu, '/url');
  const canContinue = networkId || isValidUrl(rpcRoot);

  return (
    <WizardPanel title={_t.customRpcUrl}>
      <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />
      <Prev to={menu[step - 1]} title={_t.back} />

      <pre>{JSON.stringify(add[section].selectedNetwork, null, 2)}</pre>
      <TestnetSelector {...add[section]}  {...{onUpdateNetworkId, onUpdateRpcRoot}} />

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};

