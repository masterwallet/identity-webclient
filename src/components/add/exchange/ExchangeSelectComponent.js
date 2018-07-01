import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { ExchangeSelector } from './../../controls/ExchangeSelector';

const _t = {
  selectExchange: 'Select Exchange to Watch',
  continue: 'Continue'
};

export class ExchangeSelectComponent extends React.Component {
  state = {
    exchange: ''
  };

  onChange = (value) => {
    this.setState({exchange: value});
  };

  render() {
    const { exchange } = this.state;
    return (
      <WizardPanel title={_t.selectExchange}>
        {exchange ? <Next to={`/exchange/${exchange}/name`} title={_t.continue} /> : false}
        <ExchangeSelector value={exchange} onChange={this.onChange} />

        <Steps {...{ step: 0, menu: ExchangeMenu() }} />
      </WizardPanel>
    )
  }
}
