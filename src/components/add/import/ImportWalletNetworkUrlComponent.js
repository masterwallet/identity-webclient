import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { TestnetSelector } from './../../assets/TestnetSelector';
import { isValidUrl } from './../../../services/Url';

const _t = {
  customRpcUrl: 'Select Network',
  continue: 'Continue',
  back: 'Back'
};

// in this control - we know we are in the test
export const ImportWalletNetworkUrlComponent = ({ section, add, onUpdateNetworkId, onUpdateRpcRoot }) => {
  const { network, networkId, rpcRoot, testnet } = add[section];
  const menu = ImportMenu(network, testnet);
  if (!menu) return false;
  const step = findWizardStep(menu, '/url');
  const canContinue = networkId || isValidUrl(rpcRoot);
  return (
    <WizardPanel title={_t.customRpcUrl}>
      <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />
      <Prev to={menu[step - 1]} title={_t.back} />
      <TestnetSelector {...add[section]}  {...{onUpdateNetworkId, onUpdateRpcRoot}} />

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
