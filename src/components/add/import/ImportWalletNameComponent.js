import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  nameYourAccount: 'Please Name Your Wallet',
  thisIsInternal: 'Unique internal wallet name:',
  continue: 'Continue'
};

export class ImportWalletNameComponent extends React.Component {
  state = { name : '' };

  onChange = (value) => {
    this.setState({ name: value });
  };

  render() {
    const { network } = this.props.match.params;
    const menu = ImportMenu(network);
    const step = findWizardStep(menu, '/name');
    const { name } = this.state;

    return (
      <WizardPanel title={_t.nameYourAccount}>
        <Next to={ menu[step + 1] } title={_t.continue} />
        <div style={{ margin: '50px auto'}}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
          <TextInput {...{name, onChange: this.onChange, autofocus: true }} style={{ textAlign: 'center' }}  />
        </div>

        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}
