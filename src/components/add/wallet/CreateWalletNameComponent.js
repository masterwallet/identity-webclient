import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';
import { NetworkIcon } from './../../assets/NetworkIcon';
import Modal from './../../controls/Modal';
import { PinCode } from './../../controls/PinCode';
import Passphrase from './../../controls/Passphrase';

const _t = {
  nameYourAccount: 'Please Name Your Wallet',
  thisIsInternal: 'Unique internal wallet name:',
  continue: 'Continue',
  back: 'Back',
  notUnique: 'Name must be unique',
  enterPinCode: 'Please enter PIN1 to confirm action',
  enterPassphrase: "Passphrase to encode wallet's Private Key",
};

export class CreateWalletNameComponent extends React.Component {

  state = {
    modal: false,
    pin: '',
    passphrase: ''
  };

  componentWillMount() {
    // trigger verification of the name that was entered
    // required for restoring from the session
    const { section, add, onChange } = this.props;
    onChange(add[section].name);
  }

  onPassphraseChange = (passphrase) => {
    this.setState({ passphrase });
  };

  render() {
    const{ section, add, assets, setup, onChange, onSubmit } = this.props;
    const { name, network, networkId, testnet, selectedNetwork, rpc, api } = add[section]; // isUniqueName should apper
    const { networksConfig } = setup;
    const menu = CreateMenu({ network, testnet, networksConfig });
    if (!menu) return false;

    const { isLoading } = add;
    const step = findWizardStep( menu, '/name' );
    const { pin, modal, passphrase } = this.state;
    const isUnique = assets.verifyWallet.isUnique;
    const canContinue = !!name && isUnique && passphrase.length > 0;
    const disabled = isLoading || !canContinue;

    return (
      <WizardPanel title={_t.nameYourAccount}>
        <Next
          to={menu[step + 1]}
          {...{disabled, isLoading}} title={_t.continue}
          onClick={() => { this.setState({ modal: !modal }) }}
        />
        <Prev to={menu[step - 1]} title={_t.back} />

        <div style={{ margin: '20px auto'}}>
          <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>

          <p style={{ textAlign: 'center', margin: 0 }}>{_t.thisIsInternal}</p>
          <TextInput {...{value: name, onChange, autofocus: true }} style={{ textAlign: 'center' }}  />
          {isUnique ? false : <p style={{ textAlign: 'center', color: 'red', margin: 0 }}>{_t.notUnique}</p>}
          <p style={{ textAlign: 'center', marginTop: 10, marginBottom: 0 }}>{_t.enterPassphrase}</p>
          <Passphrase { ...{ passphrase, onChange: this.onPassphraseChange }} />
        </div>
        {modal ?
          <Modal
            show={modal}
            onClose={() => { this.setState({ modal: !modal }) }}
            title={_t.enterPinCode}
            titleStyle={{ fontSize: 'medium' }}
            body={<PinCode { ...{ 
              value: pin,
              onChange: (pin) => { this.setState({ pin }) },
              onComplete: (pin) => { 
                onSubmit({ ...selectedNetwork, network, testnet, networkId, name, rpc, api, pin, passphrase });
                this.setState({ pin: '', modal: false });
              }
            }} />}
          />
        : false}
        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
  }
}
