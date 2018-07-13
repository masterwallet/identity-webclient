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
  back: 'Back',
  notUnique: 'The name must be unique'
};

export const ExchangeNameComponent = ({ section, add, assets, onChange }) => {
  const { network, name, selectedNetwork } = add[section]; // name is unique
  const menu = ExchangeMenu(network);
  const step = findWizardStep(menu, '/name');
  const isUnique = assets.verifyWallet.isUnique;
  const canContinue = !!name && isUnique;
  return (
    <WizardPanel title={_t.nameYourAccount}>
      <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />
      <Prev to={menu[step - 1]} title={_t.back} />
      <div style={{ margin: '20px auto'}}>
        <NetworkIcon {...selectedNetwork} title={network} style={{ margin: 20 }}/>

        <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
        <TextInput {...{value: name, onChange, autofocus: true }} style={{ textAlign: 'center' }} />
        {isUnique ? false : <p style={{ textAlign: 'center', color: 'red', margin: 0 }}>{_t.notUnique}</p>}
      </div>
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};

