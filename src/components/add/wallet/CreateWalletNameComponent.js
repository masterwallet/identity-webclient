import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  nameYourAccount: 'Please Name Your Account',
  thisIsInternal: 'Unique internal wallet name:',
  continue: 'Continue'
};

export class CreateWalletNameComponent extends React.Component {
  onChange = (value) => {
    // this.setState({network: value});
  };

  render() {
    const value = '';
    const { network } = this.props.match.params;
    return (
      <WizardPanel title={_t.nameYourAccount}>
        <Next to={`/create/${network}/account`} title={_t.continue} />
        <div style={{ margin: '50px auto'}}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
          <TextInput {...{value, onChange: this.onChange, autofocus: true }} />
        </div>
        <Steps {...{ step: 1, menu: CreateMenu() }} />
      </WizardPanel>
    )
  }
}
