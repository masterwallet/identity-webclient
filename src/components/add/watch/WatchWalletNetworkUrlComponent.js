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

export const WatchWalletNetworkUrlComponent = ({ 
  add, section, setup, onUpdateNetworkId, onUpdateRpcRoot, onUpdateApiRoot
}) => {
  const { network, testnet, networkId, rpcRoot, apiRoot, selectedNetwork } = add[section];
  const { networksConfig } = setup;
  const menu = WatchMenu({ network, testnet, networksConfig });
  if (!menu) return false;

  const step = findWizardStep(menu, '/url');
  const hasApi = selectedNetwork.apiName && isValidUrl(apiRoot);
  const canContinue = networkId || (isValidUrl(rpcRoot) && hasApi);

  return (
    <WizardPanel title={_t.customRpcUrl}>
      <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />
      <Prev to={menu[step - 1]} title={_t.back} />
      <TestnetSelector {...add[section]}  {...{onUpdateNetworkId, onUpdateRpcRoot, onUpdateApiRoot}} />
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};

