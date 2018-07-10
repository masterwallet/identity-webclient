import React from 'react';
import { Steps } from './../../controls/Steps';
import { NetworkIcon } from './../../assets/NetworkIcon';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  nameYourAccount: 'Please Name Your Wallet',
  thisIsInternal: 'Unique internal wallet name:',
  continue: 'Continue'
};

const section = 'import';
export const ImportWalletNameComponent = ({ add, onChange }) => {
  const { name, network, selectedNetwork } = add[section];
  const menu = ImportMenu(network);
  const step = findWizardStep(menu, '/name');

  return (
    <WizardPanel title={_t.nameYourAccount}>
      <Next to={ menu[step + 1] } title={_t.continue} />
      <div style={{ margin: '20px auto'}}>
        <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>

        <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
        <TextInput {...{value: name, onChange, autofocus: true }} style={{ textAlign: 'center' }}  />
      </div>
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}
