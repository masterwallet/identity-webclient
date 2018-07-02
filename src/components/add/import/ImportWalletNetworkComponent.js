import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { NetworkSelector } from './../../controls/NetworkSelector';

const _t = {
  selectNetwork: 'Import Wallet: Select Network',
  continue: 'Continue'
};

export class ImportWalletNetworkComponent extends React.Component {
  state = {
    network: 'ETH'
  };

  onChange = (value) => {
    this.setState({network: value});
  };

  render() {
    const { network } = this.state;
    const menu = ImportMenu(network);
    const step = 0;
    // TODO: switcher for MainNet or TestNet. The next screen (for testnet appears if testnet was selected)
    return (
      <WizardPanel title={_t.selectNetwork}>
        {network ? <Next to={menu[step + 1]} title={_t.continue} /> : false}
        <NetworkSelector value={network} onChange={this.onChange} />

        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}
