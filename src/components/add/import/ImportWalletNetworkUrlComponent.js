import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { NetworkIcon } from './../../assets/NetworkIcon';
import TextInput from './../../controls/TextInput';
import RadioButtonGroup from './../../controls/RadioButtonGroup';

const _t = {
  customRpcUrl: 'Custom RPC URL',
  useCustomNetworkRPC: 'Use custom network RPC URL:',
  pleaseUseOwnEndpoint: 'Please provide own endpoint',
  continue: 'Continue'
};

const getOptions = (list) => ([
  { value: '', label: _t.customRpcUrl, comment: _t.pleaseUseOwnEndpoint },
  ...list.map(option => (
    { value: option.value, label: option.name, comment: option.explorer }
  ))

]);

export const TestnetSelector = (props) => {
  const { network, networkId, rpcRoot, selectedNetwork } = props;
  const { testnets } = selectedNetwork;
  const { onUpdateNetworkId, onUpdateRpcRoot } = props;

  const bShowCustomUrl = !networkId;
  const options = getOptions(testnets);
  return(
    <div>
      <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>
      {testnets ? (
        <RadioButtonGroup
          onChange={val => (onUpdateNetworkId(val))}
          value={networkId || ''} options={options} />
      ): false}
      {bShowCustomUrl ? [
        <p key={1} style={{ textAlign: 'center', margin: 0, marginTop: 20 }}>{_t.useCustomNetworkRPC}</p>,
        <TextInput
          key={2} {...{value: rpcRoot, autofocus: true }}
          onChange={onUpdateRpcRoot}
        />
      ] : false}
    </div>
  );
};

// in this control - we know we are in the test
const section = 'import';
export const ImportWalletNetworkUrlComponent = ({ add, onUpdateNetworkId, onUpdateRpcRoot }) => {
    const { network, testnet } = add[section];
    const menu = WatchMenu(network, testnet);
    const step = findWizardStep(menu, '/url');
    return (
      <WizardPanel title={_t.customRpcUrl}>
        <Next to={menu[step + 1]} title={_t.continue} />

        <TestnetSelector {...add[section]}  {...{onUpdateNetworkId, onUpdateRpcRoot}} />

        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
};
