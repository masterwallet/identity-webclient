import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  nameYourAccount: 'Please Name Your Account',
  thisIsInternal: 'Unique internal wallet name:',
  continue: 'Continue'
};

export class WatchWalletNameComponent extends React.Component {
  state = { value: '' };

  onChange = (value) => {
    this.setState({value});
  };

  render() {
    const { value } = this.state;
    const { network } = this.props.match.params;
    const menu = WatchMenu(network);
    const step = findWizardStep(menu, '/name');
    return (
      <WizardPanel title={_t.nameYourAccount}>
        <Next to={menu[step + 1]} title={_t.continue} />
        <div style={{ margin: '50px auto'}}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
          <TextInput {...{value, onChange: this.onChange, autofocus: true }} />
        </div>

        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}
