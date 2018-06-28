import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { ExchangeSelector } from './../../controls/ExchangeSelector';

const _t = {
  selectExchange: 'Select Exchange to Add',
  continue: 'Continue'
};

export class ExchangeSelectComponent extends React.Component {
  state = {
    network: 'ETH'
  };

  onChange = (value) => {
    this.setState({network: value});
  };

  render() {
    const { network } = this.state;
    return (
      <WizardPanel title={_t.selectExchange}>
        <Next to={`/exchange/${network}/account`} title={_t.continue} />
        <ExchangeSelector value={network} onChange={this.onChange} />

        <Steps {...{ step: 0, menu: ExchangeMenu() }} />
      </WizardPanel>
    )
  }
}
