import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { TestnetSelector } from './../../assets/TestnetSelector';
import { isValidUrl } from './../../../services/Url';

const _t = {
  customRpcUrl: 'Custom RPC URL',
  useCustomNetwork: 'Use custom network RPC URL:',
  continue: 'Continue',
  back: 'Back'
};

export class CreateWalletNetworkUrlComponent extends React.Component {
  
  componentDidMount = () => {
    const { add, section } = this.props;
    const { selectedNetwork } = add[section];
    const { local } = selectedNetwork;
    if (local) {
      this.props.onUpdateRpcRoot(local.rpc);
      this.props.onUpdateApiRoot(local.api);
    }
  };

  render = () => {
    const { add, section, setup, onUpdateNetworkId, onUpdateRpcRoot, onUpdateApiRoot } = this.props;
    const { network, testnet, networkId, rpc, api, selectedNetwork } = add[section];
    const { networksConfig } = setup;
    const menu = CreateMenu({ network, testnet, networksConfig });
    if (!menu) return false;

    const step = findWizardStep(menu, '/url');
    const hasApi = !selectedNetwork.apiName || (selectedNetwork.apiName && api && isValidUrl(api));
    const canContinue = networkId || (isValidUrl(rpc) && hasApi);
    return (
      <WizardPanel title={_t.customRpcUrl}>
        <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />
        <Prev to={menu[step - 1]} title={_t.back} />

        <TestnetSelector {...add[section]}  {...{onUpdateNetworkId, onUpdateRpcRoot, onUpdateApiRoot}} />

        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
  };
};
