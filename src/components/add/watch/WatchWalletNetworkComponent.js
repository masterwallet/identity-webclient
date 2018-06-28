import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { NetworkSelector } from './../../controls/NetworkSelector';

const _t = {
  selectNetwork: 'Wallet Watch: Select Network',
  continue: 'Continue'
};

export class WatchWalletNetworkComponent extends React.Component {
  state = {
    network: 'ETH'
  };

  onChange = (value) => {
    this.setState({ network: value });
  };

  render() {
    const { network } = this.state;
    return (
      <WizardPanel title={_t.selectNetwork}>
        <Next to={`/watch/${network}/wallet`} title={_t.continue} />
        <NetworkSelector value={network} onChange={this.onChange} />

        <Steps {...{ step: 0, menu: WatchMenu() }} />
      </WizardPanel>
    )
  }
}
