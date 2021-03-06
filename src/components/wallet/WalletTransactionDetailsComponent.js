import React from 'react';
import Esc from './../panel/Esc';
import { WalletPanel } from './../panel/index';
import { SmallLoader } from './../controls/SmallLoader';

// const _t = {

// };


export class WalletTransactionDetailsComponent extends React.Component {

  state = {

  };

  componentWillMount = () => {
    const { walletId, txId } = this.props.match.params;
    const { assets, wallet } = this.props;
    this.props.onInit({ walletId, txId, props: { assets, wallet } });
  };

  render () {
    //console.log(this.props);
    const { walletId, txId } = this.props.match.params;
    const { wallet, transactions } = this.props;
    const { object, isLoading, assets } = wallet; 
    const { id } = object;

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
          loading ? <SmallLoader /> : (
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