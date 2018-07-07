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

export const ImportWalletNameComponent = ({ add, onChange }) => {
  const { selectedNetwork } = add;
  const { name, network } = add.import;
  const menu = ImportMenu(network);
  const step = findWizardStep(menu, '/name');

  return (
    <WizardPanel title={_t.nameYourAccount}>
      <Next to={ menu[step + 1] } title={_t.continue} />
      <div style={{ margin: '50px auto'}}>
        <p style={{ textAlign: 'center' }}>
          <img src={selectedNetwork.icon} alt='' style={{ height: 24, width: 'auto' }} />
          <br />
          <strong>{selectedNetwork.name}</strong>
        </p>
        <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
        <TextInput {...{value: name, onChange, autofocus: true }} style={{ textAlign: 'center' }}  />
      </div>
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}
