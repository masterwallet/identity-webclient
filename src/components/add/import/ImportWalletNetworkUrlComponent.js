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

const TestnetSelector = (props) => {
  const { network, rpcRoot, testnet, testnets } = props;
  const { onUpdateNetworkId, onUpdateRpcRoot } = props;

  return(
    <div style={{ margin: '50px auto'}}>
      <p style={{ textAlign: 'center', margin: 0 }}>{_t.useCustomNetwork}</p>
      <TextInput {...{value: rpcRoot, onChange: onUpdateRpcRoot, autofocus: true }} />
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

// in this control - we know we are in the test
export const ImportWalletNetworkUrlComponent = ({ add, onUpdateNetworkId, onUpdateRpcRoot }) => {
    const { network, testnet } = add.import;
    const menu = WatchMenu(network, testnet);
    const step = findWizardStep(menu, '/url');
    return (
      <WizardPanel title={_t.customRpcUrl}>
        <Next to={menu[step + 1]} title={_t.continue} />

        <TestnetSelector {...add.import} {...{onUpdateNetworkId, onUpdateRpcRoot}} />

        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
};
