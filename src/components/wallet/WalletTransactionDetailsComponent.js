import React from 'react';
import Esc from './../panel/Esc';
import { WalletPanel } from './../panel/index';

const _t = {

};


export class WalletTransactionDetailsComponent extends React.Component {

  state = {

  };

  componentWillMount = () => {
    const { walletId, txId } = this.props.match.params;
    this.props.onInit({ walletId, txId });
  };

  render () {
    //console.log(this.props);
    const { walletId, txId } = this.props.match.params;
    const { wallet, transactions } = this.props;
    const { object, isLoading, error, assets, deletionStatus } = wallet; 
    const { id } = object;
    const errorMessage = error; // no need to display assets error

    const details = (
      transactions.details[walletId] 
      && transactions.details[walletId][txId]
    ) ? transactions.details[walletId][txId] : false;
    const loading = details ? details.loading : false;
    const detailsError = details ? details.error : false;

    return (
      <WalletPanel {...object} isLoading={isLoading || assets.isLoading} back={true} >
        <Esc to={`/wallets/${id}/balance`} />
        {details ? 
        (
          loading ? false : (
            detailsError ? (
              <div className='alert alert-danger'>{detailsError}</div>
            ) : (
              <div style={{ textAlign: 'left' }}>
                <pre>{JSON.stringify(details.data, null, 2)}</pre>
              </div>
            )
          )
        ): false}
      </WalletPanel>
    );
  };
};