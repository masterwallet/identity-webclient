import React from 'react';
import { Redirect } from 'react-router-dom';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';

const _t = {
  paperWallet: 'Print Paper Wallet',
  printInsecurePaperWallet: 'Here you can print insecure Paper Wallet:',
  printSecuredPaperWallet: 'Or you can print Paper Wallet, secured with password:',
  myAssets: 'My Wallets',
  printWallet: 'Print Wallet',
  yourPassword: 'Secret Wallet Password'
};


const section = 'create';
export class CreateWalletPaperComponent extends React.Component {
  state = { value: '' };

  onChange = (value) => {
    this.setState({ value});
  };

  render() {
    const { value } = this.state;
    const { add, setup } = this.props;
    const { network, testnet } = add[section];
    const { networksConfig } = setup;
    const menu = CreateMenu({ network, testnet, networksConfig });
    if (!menu) return false;

    const step = findWizardStep(menu, '/paper')
    const { lastResponse } = add;
    if (!lastResponse || !lastResponse.data || !lastResponse.data.id) {
      return <Redirect to={menu[step - 1]} />
    }

    return (
      <WizardPanel title={_t.paperWallet}>
        <Next to={`/wallets`} title={_t.myAssets} />
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
        <hr />
        <pre>{JSON.stringify({ lastResponse }, null, 2)}</pre>
        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}
