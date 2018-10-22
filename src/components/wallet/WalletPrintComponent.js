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
    const { wallet } = this.props;
    const { object, isLoading, error, assets } = wallet; 
    const { id } = object;
    const { secure } = this.props.match.params;
    const errorMessage = error; // no need to display assets error
    return (
      <WalletPanel {...object} isLoading={isLoading || assets.isLoading} back={true} >
        <Esc to={`/wallets/${id}/balance`} />
        {errorMessage ? ( <div className='error'>{errorMessage}</div> ) 
          : (
            <div>
              <PaperWalletComponent walletId={id} secure={secure} />
            </div>
        )}
      </WalletPanel>
    );
  };
};