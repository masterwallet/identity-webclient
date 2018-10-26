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
export class ImportWalletNetworkUrlComponent extends React.Component {

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
    const { section, add, setup, onUpdateNetworkId, onUpdateRpcRoot, onUpdateApiRoot } = this.props;
    const { network, networkId, rpc, api, testnet, selectedNetwork } = add[section];
    const { networksConfig } = setup;
    const menu = ImportMenu({ network, testnet, networksConfig });
    if (!menu) return false;
    const step = findWizardStep(menu, '/url');
    const hasApi = !selectedNetwork.apiName || (selectedNetwork.apiName && api && isValidUrl(api));
    const canContinue = networkId || (isValidUrl(rpc) && hasApi);
    return (
      <WizardPanel title={_t.customRpcUrl}>
        <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />
        <Prev to={menu[step - 1]} title={_t.back} />
        <TestnetSelector {...add[section]}  {...{ onUpdateNetworkId, onUpdateRpcRoot, onUpdateApiRoot }} />

        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
  };
};
