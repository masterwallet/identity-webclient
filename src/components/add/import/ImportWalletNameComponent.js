import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  nameYourAccount: 'Please Name Your Account',
  continue: 'Continue'
};

export class ImportWalletNameComponent extends React.Component {
  onChange = (value) => {
    // this.setState({network: value});
  };

  render() {
    const value = '';
    const { network } = this.props.match.params;
    return (
      <WizardPanel title={_t.nameYourAccount}>
        <Next to={`/import/${network}/account`} title={_t.continue} />
        <div style={{ margin: '50px auto'}}>
          <TextInput {...{value, onChange: this.onChange, autofocus: true }} />
        </div>

        <Steps {...{ step: 1, menu: ImportMenu() }} />
      </WizardPanel>
    )
  }
}
