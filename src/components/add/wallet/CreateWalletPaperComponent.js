import React from 'react';
import { Redirect } from 'react-router-dom';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import PaperWalletComponent from './../../wallet/PaperWalletComponent';


const _t = {
  paperWallet: 'Print Paper Wallet',
  myAssets: 'My Wallets',
};

const section = 'create';
export class CreateWalletPaperComponent extends React.Component {

  render() {
    
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
    const { id } = lastResponse.data;
    const bip38 = networksConfig.data.find(data => data.value === network).BIP38;

    return (
      <WizardPanel title={_t.paperWallet}>
        <Next to={`/wallets`} title={_t.myAssets} />
        <PaperWalletComponent walletId={id} bip38={bip38} />
        <hr />
        {/* <pre>{JSON.stringify({ lastResponse }, null, 2)}</pre> */}
        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}
