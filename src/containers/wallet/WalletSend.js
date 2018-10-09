import { connect } from 'react-redux';
import { WalletSendComponent } from './../../components/wallet';
import { dispatchWalletDetails } from './../../services/WalletStatus';
import { postJson, fetchJson } from './../../services/ApiRequest';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: ({ id }) => {
    dispatchWalletDetails(id, dispatch);
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
  onSubmit: ({ walletId, amount, to, asset, fee, contractAddress }) => {
    const payload = { walletId };
    dispatch({ type: 'TRANSACTION_SUBMITTED', payload });
    postJson(`/api/wallets/${walletId}/transaction`, { amount, to, asset, fee, contractAddress }).then(response => {
      if (response.error) {
        payload.error = response.error;
        dispatch({ type: 'TRANSACTION_ERROR', payload });
      } else {
        payload.data = response.data;
        payload.txId = response.data.txid;
        dispatch({ type: 'TRANSACTION_SENT', payload });
      }
    }).catch(error => {
      dispatch({ type: 'TRANSACTION_ERROR', payload: { walletId, error: error.message } });
    });
  }
});

export const WalletSend = connect(mapStateToProps, mapDispatchToProps)(WalletSendComponent);
export default { WalletSend };
