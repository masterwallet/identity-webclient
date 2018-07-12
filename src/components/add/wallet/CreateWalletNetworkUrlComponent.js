import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { TestnetSelector } from './../../assets/TestnetSelector';

const _t = {
  customRpcUrl: 'Custom RPC URL',
  useCustomNetwork: 'Use custom network RPC URL:',
  continue: 'Continue',
  back: 'Back'
};

export const CreateWalletNetworkUrlComponent = ({ add, section, onUpdateNetworkId, onUpdateRpcRoot }) => {
    const { network, testnet } = add[section];
    
    const menu = CreateMenu(network, testnet);
    const step = findWizardStep(menu, '/url');
    return (
        <WizardPanel title={_t.customRpcUrl}>
        <Next to={menu[step + 1]} title={_t.continue} />
        <Prev to={menu[step - 1]} title={_t.back} />

        <TestnetSelector {...add[section]}  {...{onUpdateNetworkId, onUpdateRpcRoot}} />

        <Steps {...{ step, menu }} />
        </WizardPanel>
    );
}

