import React from 'react';
import { Redirect } from 'react-router-dom';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';
import RadioButtonGroup from './../../controls/RadioButtonGroup';
// import TextArea from './../../controls/TextArea';
import { hasBip38 } from './../../../services/Utils';

const _t = {
  enterPrivateKey: 'Enter Private Key',
  providePrivateKey: 'Please provide your Private Key:',
  providePassphrase: 'Please provide encryption passphrase:',
  orCopyPasteKeyStore: 'or Paste Key Store File Contents',
  continue: 'Continue',
  back: 'Back',
  labelSecure: 'Password Protected Wallet',
  labelInsecure: 'Insecure Wallet',
};

const section = 'import';
export class ImportWalletInputComponent extends React.Component {
  state = {
    privateKey: '',
    password: '',
    mode: 'insecure'
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

  render() {
    const { add, setup, onSubmit } = this.props;
    const { lastResponse } = add; // lastError
    const { name, network, networkId, testnet, rpc, api } = add[section];
    const networksConfig = { network, networkId, testnet, rpc, api };
    const menu = ImportMenu({ network, testnet, networksConfig });
    if (!menu) return false;
    const step = findWizardStep(menu, '/wallet');
    const { privateKey, password, mode } = this.state;

    const canContinue = !!privateKey;
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

    const onSend = () => (onSubmit({ ...networksConfig, name, privateKey, password }));
    return (
      <WizardPanel title={_t.enterPrivateKey} wide={false}>
        <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} onClick={onSend}/>
        <Prev to={menu[step - 1]} title={_t.back} />

        <div style={{ margin: '20px auto'}}>
          <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.providePrivateKey}</p>
          <TextInput value={privateKey} onChange={this.onChangePrivateKey} />
        </div>
        <div>
          <RadioButtonGroup options={radioOptions} onChange={this.onChangeMode} value={mode} />
        </div>
        {
          mode === 'secure' ? 
          <div style={{ margin: '20px auto'}}>
            <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.providePassphrase}</p>
            <TextInput value={password} onChange={this.onChangePassword} />
          </div> 
          : false
        }

        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  }

}
