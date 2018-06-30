import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  paperWallet: 'Print Paper Wallet',
  printInsecurePaperWallet: 'Here you can print insecure Paper Wallet:',
  continue: 'Continue'
};

export class CreateWalletPaperComponent extends React.Component {
  onChange = (value) => {
    // this.setState({network: value});
  };

  render() {
    const value = '';
    const { network } = this.props.match.params;
    return (
      <WizardPanel title={_t.paperWallet}>
        <Next to={`/create/${network}/complete`} title={_t.continue} />
        <div style={{ margin: '50px auto'}}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.printInsecurePaperWallet}</p>
          <div style={{ textAlign: 'center' }}>
            <button>Print Wallet</button>
          </div>
        </div>
        <Steps {...{ step: 3, menu: CreateMenu() }} />
      </WizardPanel>
    )
  }
}
