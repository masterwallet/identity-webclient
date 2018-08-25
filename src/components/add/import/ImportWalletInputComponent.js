import React from 'react';
import { Redirect } from 'react-router-dom';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';
// import TextArea from './../../controls/TextArea';

const _t = {
  enterPrivateKey: 'Enter Private Key',
  providePrivateKey: 'Please provide your Private Key:',
  providePassphrase: 'Please provide encryption passphrase, if any:',
  orCopyPasteKeyStore: 'or Paste Key Store File Contents',
  continue: 'Continue',
  back: 'Back'
};

const section = 'import';
export class ImportWalletInputComponent extends React.Component {
  state = {
    privateKey: '',
    password: ''
  };

  onChangePrivateKey = (value) => {
    this.setState({ privateKey: value });
  };
  onChangePassword = (value) => {
    this.setState({ password: value });
  };

  render() {
    const { add, onSubmit } = this.props;
    const { lastResponse } = add; // lastError
    const { name, network, networkId, testnet } = add[section];
    const networksConfig = { network, networkId, testnet };
    const menu = ImportMenu({ network, testnet, networksConfig });
    if (!menu) return false;
    const step = findWizardStep(menu, '/wallet');
    const { privateKey, password } = this.state;

    const canContinue = !!privateKey;
    if (lastResponse.data && lastResponse.data.id) {
      return (<Redirect to={menu[step + 1]} />);
    }

    const onSend = () => (onSubmit({ ...networksConfig, name, privateKey, password }));
    return (
      <WizardPanel title={_t.enterPrivateKey} wide={true}>
        <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} onClick={onSend}/>
        <Prev to={menu[step - 1]} title={_t.back} />

        <div style={{ margin: '20px auto'}}>
          <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.providePrivateKey}</p>
          <TextInput value={privateKey} onChange={this.onChangePrivateKey} />
        </div>
        <div style={{ margin: '20px auto'}}>
          <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.providePassphrase}</p>
          <TextInput value={password} onChange={this.onChangePassword} />
        </div>

        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  }

}
