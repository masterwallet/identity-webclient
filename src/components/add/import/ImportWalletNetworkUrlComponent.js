import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { TestnetSelector } from './../../assets/TestnetSelector';

const _t = {
  customRpcUrl: 'Custom RPC URL',
  useCustomNetworkRPC: 'Use custom network RPC URL:',
  pleaseUseOwnEndpoint: 'Please provide own endpoint',
  continue: 'Continue'
};

// in this control - we know we are in the test
const section = 'import';
export const ImportWalletNetworkUrlComponent = ({ add, onUpdateNetworkId, onUpdateRpcRoot }) => {
    const { network, testnet } = add[section];
    const menu = ImportMenu(network, testnet);
    const step = findWizardStep(menu, '/url');
    return (
      <WizardPanel title={_t.customRpcUrl}>
        <Next to={menu[step + 1]} title={_t.continue} />

        <TestnetSelector {...add[section]}  {...{onUpdateNetworkId, onUpdateRpcRoot}} />

        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
};
