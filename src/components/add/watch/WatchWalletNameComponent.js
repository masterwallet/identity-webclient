import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  nameYourAccount: 'Please Name Your Account',
  thisIsInternal: 'Unique internal wallet name:',
  continue: 'Continue',
  back: 'Back'
};

export const WatchWalletNameComponent = ({ section, add, onChange }) => {
  const { name, network, testnet } = add[section];
  const menu = WatchMenu(network, testnet);
  const step = findWizardStep(menu, '/name');
  return (
    <WizardPanel title={_t.nameYourAccount}>
      <Next to={menu[step + 1]} title={_t.continue} />
      <Prev to={menu[step - 1]} title={_t.back} />

      <div style={{ margin: '50px auto'}}>
        <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
        <TextInput {...{ name, onChange, autofocus: true }} style={{ textAlign: 'center' }} />
      </div>

      <Steps {...{ step, menu }} />
    </WizardPanel>
  )
}
