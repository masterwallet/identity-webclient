import React from 'react';
import { NetworkIcon } from './NetworkIcon';
import TextInput from './../controls/TextInput';
import RadioButtonGroup from './../controls/RadioButtonGroup';

const _t = {
  customRpcUrl: 'Custom RPC URL',
  useCustomNetworkRPC: 'Use custom network RPC URL:',
  pleaseUseOwnEndpoint: 'Please provide own endpoint',
};

const getOptions = (list) => ([
  { value: '', label: _t.customRpcUrl, comment: _t.pleaseUseOwnEndpoint },
  ...list.map(option => (
  { value: option.value, label: option.name, comment: option.explorer }
  ))
]);

export const TestnetSelector = (props) => {
  const { network, networkId, selectedNetwork } = props;
  const { testnets, local } = selectedNetwork;
  const { rpc, api } = local;
  const { onUpdateNetworkId, onUpdateRpcRoot, onUpdateApiRoot } = props;

  const bShowRpcUrl = !networkId;
  const bShowApiUrl = bShowRpcUrl && selectedNetwork.apiName;

  const options = testnets ? getOptions(testnets)  : [];
  return(
    <div>
      <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>
      {testnets ? (
        <RadioButtonGroup
          onChange={val => (onUpdateNetworkId(val))}
          value={networkId || ''} options={options} />
      ): false}
      {bShowRpcUrl ? [
        <p key={1} style={{ textAlign: 'center', margin: 0, marginTop: 20 }}>{_t.useCustomNetworkRPC}</p>,
        <TextInput
          key={2} {...{value: rpc, autofocus: true }}
          onChange={onUpdateRpcRoot}
        />
      ] : false}
      {bShowApiUrl ? [
        <p key={1} style={{ textAlign: 'center', margin: 0, marginTop: 12 }}>{selectedNetwork.apiName}:</p>,
        <TextInput
          key={2} {...{value: api }}
          onChange={onUpdateApiRoot}
        />
      ] : false}
    </div>
  );
};
