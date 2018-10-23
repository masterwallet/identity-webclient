import { connect } from 'react-redux';
import { WalletTransactionDetailsComponent } from './../../components/wallet/index';
import { dispatchWalletDetails } from './../../services/WalletStatus';
import { fetchJson } from './../../services/ApiRequest';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: ({ walletId, txId, props }) => {
    dispatchWalletDetails({ walletId, dispatch, props });
    const payload = { walletId, txId };
    dispatch({
      type: 'TRANSACTION_DETAILS_REQUEST',
      payload
    });
    fetchJson(`/api/wallets/${walletId}/transaction/${txId}`).then(response => {
      if (response.error) {
        payload.error = response.error;
        dispatch({ type: 'TRANSACTION_DETAILS_ERROR', payload });
      } else {
        payload.data = response.data;
        dispatch({ type: 'TRANSACTION_DETAILS_RECEIVED', payload });
      }
    }).catch(error => {
      payload.error = error.message;
      dispatch({ type: 'TRANSACTION_DETAILS_ERROR', payload });
    })
  }
});

export const WalletTransactionDetails = connect(mapStateToProps, mapDispatchToProps)(WalletTransactionDetailsComponent);
export default { WalletTransactionDetails };