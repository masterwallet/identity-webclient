import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';
import { Exchanges } from './../../../config/Exchanges';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  enterYourKeys: 'Please Enter API Keys',
  checkKeys: 'Check Keys'
};

export class ExchangeInputComponent extends React.Component {
  onChange = (value) => {
    // this.setState({network: value});
  };

  render() {
    const value = '';
    const { exchange } = this.props.match.params;
    return (
      <WizardPanel title={_t.enterYourKeys}>
        <Next to={`/exchange/${exchange}/complete`} title={_t.checkKeys} />
        <div style={{ margin: '50px auto'}}>
          {Exchanges.filter(x => (x.value === exchange)).map(x => (
            <div key={x.value}>
            {x.keys.map(item => (
              <div key={item.id}>
                {item.label}:
                <br />
                <TextInput {...{value, onChange: this.onChange }} />
              </div>
            ))}
            </div>
          ))}
        </div>

        <Steps {...{ step: 2, menu: ExchangeMenu() }} />
      </WizardPanel>
    )
  }
}
