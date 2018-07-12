import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { TestnetSelector } from './../../assets/TestnetSelector';

const _t = {
  continue: 'Continue',
  back: 'Back'
};

// in this control - we know we are in the test
export const ImportWalletNetworkUrlComponent = ({ section, add, onUpdateNetworkId, onUpdateRpcRoot }) => {
    const { network, testnet } = add[section];
    const menu = ImportMenu(network, testnet);
    const step = findWizardStep(menu, '/url');
    return (
      <WizardPanel title={_t.customRpcUrl}>
        <Next to={menu[step + 1]} title={_t.continue} />
        <Prev to={menu[step - 1]} title={_t.back} />
        <TestnetSelector {...add[section]}  {...{onUpdateNetworkId, onUpdateRpcRoot}} />

        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
};
