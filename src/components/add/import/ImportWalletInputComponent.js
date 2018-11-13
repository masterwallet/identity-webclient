import React from 'react';
import { Redirect } from 'react-router-dom';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';
import RadioButtonGroup from './../../controls/RadioButtonGroup';
import { hasBip38 } from './../../../services/Utils';
import Modal from './../../controls/Modal';
import { PinCode } from './../../controls/PinCode';
import Passphrase from './../../controls/Passphrase';

const _t = {
  enterPrivateKey: 'Enter Private Key',
  providePrivateKey: 'Please provide your Private Key:',
  providePassphrase: 'Please provide encryption passphrase:',
  orCopyPasteKeyStore: 'or Paste Key Store File Contents',
  continue: 'Continue',
  back: 'Back',
  labelSecure: 'Password Protected Wallet',
  labelInsecure: 'Insecure Wallet',
  enterPinCode: 'Please enter PIN1 to confirm action',
  enterPassphrase: "Passphrase to encode wallet's Private Key",
};

const section = 'import';
export class ImportWalletInputComponent extends React.Component {
  state = {
    privateKey: '',
    password: '',
    mode: 'insecure',
    modal: false,
    pin: '',
    passphrase: '',
  };

  onChangePrivateKey = (value) => {
    this.setState({ privateKey: value });
  };
  onChangePassword = (value) => {
    this.setState({ password: value });
  };
  onChangeMode = (value) => {
    let { mode, password } = this.state;
    password = mode === 'insecure' ? '' : password;
    this.setState({ mode: value, password });
  };
  onPassphraseChange = (passphrase) => {
    this.setState({ passphrase });
  };

  render() {
    const { add, setup, onSubmit } = this.props;
    const { lastResponse } = add; // lastError
    const { name, network, networkId, testnet, rpc, api } = add[section];
    const networksConfig = { network, networkId, testnet, rpc, api };
    const menu = ImportMenu({ network, testnet, networksConfig });
    if (!menu) return false;
    const step = findWizardStep(menu, '/wallet');
    const { privateKey, password, mode, modal, pin, passphrase } = this.state;

    const canContinue = !!privateKey && passphrase.length > 0;
    if (lastResponse && lastResponse.data && lastResponse.data.id) {
      return (<Redirect to={menu[step + 1]} />);
    }
    const bip38 = hasBip38(setup, network);
    const radioOptions = [
      { value: 'insecure', label: _t.labelInsecure }
    ];
    if (bip38) {
      radioOptions.push({ value: 'secure', label: _t.labelSecure });
    }

    const onSend = (pin) => (onSubmit({ ...networksConfig, name, privateKey, password, pin, passphrase }));
    return (
      <WizardPanel title={_t.enterPrivateKey} wide={false}>
        <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} onClick={() => { this.setState({ modal: !modal }) }}/>
        <Prev to={menu[step - 1]} title={_t.back} />

        <div style={{ margin: '20px auto'}}>
          <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.providePrivateKey}</p>
          <TextInput value={privateKey} onChange={this.onChangePrivateKey} />
          {_t.enterPassphrase}
          <Passphrase { ...{ passphrase, onChange: this.onPassphraseChange }} />
        </div>
        {radioOptions.length > 1 ? (
          <div>
            <RadioButtonGroup options={radioOptions} onChange={this.onChangeMode} value={mode} />
          </div>
        ) : false}
        {
          mode === 'secure' ? 
          <div style={{ margin: '20px auto'}}>
            <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.providePassphrase}</p>
            <TextInput value={password} onChange={this.onChangePassword} />
          </div> 
          : false
        }
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
                onSend(pin);
                this.setState({ pin: '', modal: false });
              }
            }} />}
          />
        : false}
        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  }

}
