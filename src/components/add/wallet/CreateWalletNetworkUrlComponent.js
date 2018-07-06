import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  customRpcUrl: 'Custom RPC URL',
  useCustomNetwork: 'Use custom network RPC URL:',
  continue: 'Continue'
};

export const CreateWalletNetworkUrlComponent = ({ add, onUpdate }) => {
    const { network, testnet, rpcRoot } = add.create;
    // const { network } = this.props.match.params;
    const menu = WatchMenu(network, testnet);
    const step = findWizardStep(menu, '/url');
    return (
        <WizardPanel title={_t.customRpcUrl}>
        <Next to={menu[step + 1]} title={_t.continue} />
        <div style={{ margin: '50px auto'}}>
            <p style={{ textAlign: 'center', margin: 0 }}>{_t.useCustomNetwork}</p>
            <TextInput {...{value: rpcRoot, onChange: onUpdate, autofocus: true }} />
        </div>
        <Steps {...{ step, menu }} />
        </WizardPanel>
    );
}

