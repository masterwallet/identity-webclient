import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { WalletSendComponent } from './../../components/wallet';
import { dispatchWalletDetails, dispatchWalletsAssets, dispatchWalletTransactionsHistory } from './../../services/WalletStatus';
import { postJson, fetchJson } from './../../services/ApiRequest';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: ({ id, props }) => {
    dispatchWalletDetails({ walletId: id, dispatch, props });
    const walletId = id;
    dispatch({ type: 'FEE_REQUEST', payload: { walletId } });
    fetchJson(`/api/wallets/${walletId}/transaction-fee`, {}).then(response => {
      if (response.error) {
        dispatch({ type: 'FEE_ERROR', payload: { walletId, error: response.error }});
      } else {
        dispatch({ type: 'FEE_RECEIVED', payload: { walletId, fee: response.data }});
      }
    }).catch(error => {
      dispatch({ type: 'FEE_ERROR', payload: { walletId, error: error.message }});
    });
  },
  onSubmit: ({ walletId, asset, amount, to, fee, gasPrice, gasLimit, data, contractAddress, passphrase }) => {
    const payload = { walletId };
    dispatch({ type: 'TRANSACTION_SUBMITTED', payload });
    postJson(`/api/wallets/${walletId}/transaction`, { asset, amount, to, fee, gasPrice, gasLimit, data, contractAddress, passphrase }).then(response => {
      if (response.error) {
        payload.error = response.error;
        dispatch({ type: 'TRANSACTION_ERROR', payload });
      } else {
        payload.data = response.data;
        payload.txId = response.data.txid;
        dispatch({ type: 'TRANSACTION_SENT', payload });
        // Reload Wallet's assets and history after transaction is recorded:
        console.log('checking address history updates');
        fetchJson(`/api/wallets/${walletId}/updated`).then(response => {
          if (response.error) {
            console.error(response.error);
          } else {
            console.log(`address updated=${response.data}`)
            if (response.data === true) {
              dispatchWalletsAssets({ walletId, dispatch })
              dispatchWalletTransactionsHistory({ walletId, dispatch });
            } else {
              // In case of error, usually when not-implemented, just wait and then refresh assets and history
              setTimeout(() => {
                dispatchWalletsAssets({ walletId, dispatch })
                dispatchWalletTransactionsHistory({ walletId, dispatch });
              }, 10000); 
            }
          }
        }).catch(error => {
          console.error(error.message);
        });
      }
    }).catch(error => {
      dispatch({ type: 'TRANSACTION_ERROR', payload: { walletId, error: error.message } });
    });
  },
  // Ethereum only
  estimateGas: ({ walletId, asset, amount, to, data, contractAddress }) => {
    postJson(`/api/wallets/${walletId}/transaction-gas`, { asset, amount, to, data, contractAddress }).then(response => {
      if (!response.error) {
        dispatch({ type: 'GAS_LIMIT_RECEIVED', payload: { walletId, gasLimit: response.data } })
      }
    });
  },
  redirect: (to) => dispatch(push(to)),
});

export const WalletSend = connect(mapStateToProps, mapDispatchToProps)(WalletSendComponent);
export default { WalletSend };
