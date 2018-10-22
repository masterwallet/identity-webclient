import React from 'react';
import Esc from './../panel/Esc';
import { WalletPanel } from './../panel/index';
import { SmallLoader } from './../controls/SmallLoader';
import PaperWalletComponent from './../wallet/PaperWalletComponent';

export class WalletPrintComponent extends React.Component {

  componentWillMount = () => {
    const id = this.props.match.params.walletId;
    this.props.onInit({ id });
  };

  render () {
    const { wallet, setup } = this.props;
    const { object, isLoading, error, assets } = wallet; 
    const { id, network } = object;
    const { secure } = this.props.match.params;
    const errorMessage = error; // no need to display assets error
    const bip38 = setup && setup.networksConfig && setup.networksConfig.data && setup.networksConfig.data.length > 0 ? setup.networksConfig.data.find(data => data.value === network).BIP38 : false;
    return (
      <WalletPanel {...object} isLoading={isLoading || assets.isLoading} back={true} >
        <Esc to={`/wallets/${id}/balance`} />
        {errorMessage ? ( <div className='error'>{errorMessage}</div> ) 
          : (
            <div>
              <PaperWalletComponent walletId={id} secure={secure} bip38={bip38} />
            </div>
        )}
      </WalletPanel>
    );
  };
};