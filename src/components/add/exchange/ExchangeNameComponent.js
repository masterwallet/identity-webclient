import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  nameYourAccount: 'Please Name Your Account',
  thisIsInternal: 'Unique internal account name:',
  continue: 'Continue'
};

export class ExchangeNameComponent extends React.Component {
  onChange = (value) => {
    // this.setState({network: value});
  };

  render() {
    const value = '';
    const { exchange } = this.props.match.params;
    return (
      <WizardPanel title={_t.nameYourAccount}>
        <Next to={`/exchange/${exchange}/account`} title={_t.continue} />
        <div style={{ margin: '50px auto'}}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
          <TextInput {...{value, onChange: this.onChange, autofocus: true }} style={{ textAlign: 'center' }} />
        </div>

        <Steps {...{ step: 1, menu: ExchangeMenu() }} />
      </WizardPanel>
    )
  }
}
