import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  paperWallet: 'Print Paper Wallet',
  printInsecurePaperWallet: 'Here you can print insecure Paper Wallet:',
  printSecuredPaperWallet: 'Or you can print Paper Wallet, secured with password:',
  continue: 'Continue',
  printWallet: 'Print Wallet',
  yourPassword: 'Secret Wallet Password'
};

export class CreateWalletPaperComponent extends React.Component {
  onChange = (value) => {
    // this.setState({network: value});
  };

  render() {
    const value = '';
    const onChange = () => {};
    const { network } = this.props.match.params;
    return (
      <WizardPanel title={_t.paperWallet}>
        <Next to={`/create/${network}/complete`} title={_t.continue} />
        <div style={{ margin: '30px auto'}}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.printInsecurePaperWallet}</p>
          <div style={{ textAlign: 'center' }}>
            <button className='btn btn-success'>{_t.printWallet}</button>
          </div>
        </div>
        <div style={{ margin: '30px auto'}}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.printSecuredPaperWallet}</p>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 5 }}>
                <TextInput value={value} onChange={onChange} placeholder={_t.yourPassword} style={{ textAlign: 'center' }}/>
            </div>
            <button className='btn btn-primary'>{_t.printWallet}</button>
          </div>
        </div>
        <Steps {...{ step: 3, menu: CreateMenu() }} />
      </WizardPanel>
    )
  }
}
