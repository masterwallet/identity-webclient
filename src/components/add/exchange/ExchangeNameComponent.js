import React from 'react';
import { Steps } from './../../controls/Steps';
import { NetworkIcon } from './../../assets/NetworkIcon';
import { ExchangeMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  nameYourAccount: 'Please Name Your Account',
  thisIsInternal: 'Unique internal account name:',
  continue: 'Continue',
  back: 'Back'
};

export const ExchangeNameComponent = ({ section, add, onChange }) => {
  const { network, name, selectedNetwork } = add[section];
  const menu = ExchangeMenu(network);
  const step = findWizardStep(menu, '/name');
  return (
    <WizardPanel title={_t.nameYourAccount}>
      <Next to={menu[step + 1]} title={_t.continue} />
      <Prev to={menu[step - 1]} title={_t.back} />
      <div style={{ margin: '20px auto'}}>
        <NetworkIcon {...selectedNetwork} title={network} style={{ margin: 20 }}/>

        <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>

        <TextInput {...{value: name, onChange, autofocus: true }} style={{ textAlign: 'center' }} />
      </div>
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};

