import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  paperWallet: 'Print Paper Wallet',
  printInsecurePaperWallet: 'Here you can print insecure Paper Wallet:',
  printSecuredPaperWallet: 'Or you can print Paper Wallet, secured with password:',
  myAssets: 'My Assets',
  printWallet: 'Print Wallet',
  yourPassword: 'Secret Wallet Password'
};

export class CreateWalletPaperComponent extends React.Component {
  state = { value: '' };

  onChange = (value) => {
    this.setState({ value});
  };

  render() {
    const { value } = this.state;
    const { network } = this.props.match.params;
    const menu = CreateMenu(network);
    const step = findWizardStep(menu, '/paper')
    return (
      <WizardPanel title={_t.paperWallet}>
        <Next to={`/assets/overview`} title={_t.myAssets} />
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
                <TextInput value={value} onChange={this.onChange} placeholder={_t.yourPassword} style={{ textAlign: 'center' }}/>
            </div>
            <button className='btn btn-primary'>{_t.printWallet}</button>
          </div>
        </div>
        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}
