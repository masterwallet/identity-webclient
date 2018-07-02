import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';
import TextArea from './../../controls/TextArea';

const _t = {
  enterPrivateKey: 'Enter Private Key',
  providePrivateKey: 'Please provide your Private Key to import your Wallet:',
  orCopyPasteKeyStore: 'or Paste Key Store File Contents',
  continue: 'Continue'
};

export class ImportWalletInputComponent extends React.Component {
  state = {
    privateKey: '',
    keyStore: ''
  };

  onChangePrivateKey = (value) => {
    this.setState({ privateKey: value });
  };
  onChangeKeyStore = (value) => {
    this.setState({ keyStore: value });
  };

  render() {
    const { network } = this.props.match.params;
    const menu = ImportMenu(network);
    const step = findWizardStep(menu, '/wallet');
    const { privateKey, keyStore } = this.state;

    return (
      <WizardPanel title={_t.enterPrivateKey} wide={true}>
        <Next to={ menu[step + 1] } title={_t.continue}/>

        <div style={{ margin: '20px auto'}}>
          <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.providePrivateKey}</p>
          <TextInput value={privateKey} onChange={this.onChangePrivateKey} />
        </div>

        <div style={{ margin: '10px auto'}}>
          <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.orCopyPasteKeyStore}</p>
          <TextArea rows={10} value={keyStore} onChange={this.onChangeKeyStore} />
        </div>

        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  }

}
