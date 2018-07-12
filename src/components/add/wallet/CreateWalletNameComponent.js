import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';
import { NetworkIcon } from './../../assets/NetworkIcon';

const _t = {
  nameYourAccount: 'Please Name Your Account',
  thisIsInternal: 'Unique internal wallet name:',
  continue: 'Continue',
  back: 'Back'
};

export const CreateWalletNameComponent = ({ section, add, onChange }) => {
  const { name, network, testnet, selectedNetwork } = add[section];
  const menu = CreateMenu(network, testnet);
  const step = findWizardStep( menu, '/name' );
  return (
    <WizardPanel title={_t.nameYourAccount}>
      <Next to={menu[step + 1]} title={_t.continue} />
      <Prev to={menu[step - 1]} title={_t.back} />

      <div style={{ margin: '20px auto'}}>
        <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>

        <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
        <TextInput {...{value: name, onChange, autofocus: true }} style={{ textAlign: 'center' }}  />
      </div>

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}
