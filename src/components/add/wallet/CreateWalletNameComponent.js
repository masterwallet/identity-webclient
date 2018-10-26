import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';
import { NetworkIcon } from './../../assets/NetworkIcon';

const _t = {
  nameYourAccount: 'Please Name Your Wallet',
  thisIsInternal: 'Unique internal wallet name:',
  continue: 'Continue',
  back: 'Back',
  notUnique: 'Name must be unique'
};

export class CreateWalletNameComponent extends React.Component {
  componentWillMount() {
    // trigger verification of the name that was entered
    // required for restoring from the session
    const { section, add, onChange } = this.props;
    onChange(add[section].name);
  }
  render() {
    const{ section, add, assets, setup, onChange, onSubmit } = this.props;
    const { name, network, networkId, testnet, selectedNetwork, rpc, api } = add[section]; // isUniqueName should apper
    const { networksConfig } = setup;
    const menu = CreateMenu({ network, testnet, networksConfig });
    if (!menu) return false;

    const { isLoading } = add;
    const step = findWizardStep( menu, '/name' );
    const isUnique = assets.verifyWallet.isUnique;
    const canContinue = !!name && isUnique;
    const disabled = isLoading || !canContinue;

    return (
      <WizardPanel title={_t.nameYourAccount}>
        <Next
          to={menu[step + 1]}
          {...{disabled, isLoading}} title={_t.continue}
          onClick={() => (onSubmit({ ...selectedNetwork, network, testnet, networkId, name, rpc, api }))}
        />
        <Prev to={menu[step - 1]} title={_t.back} />

        <div style={{ margin: '20px auto'}}>
          <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>

          <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
          <TextInput {...{value: name, onChange, autofocus: true }} style={{ textAlign: 'center' }}  />
          {isUnique ? false : <p style={{ textAlign: 'center', color: 'red', margin: 0 }}>{_t.notUnique}</p>}
        </div>

        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
  }
}
