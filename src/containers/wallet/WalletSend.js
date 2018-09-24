import { connect } from 'react-redux';
import { WalletSendComponent } from './../../components/wallet';
import { dispatchWalletDetails } from './../../services/WalletStatus';
import { postJson } from './../../services/ApiRequest';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: ({ id }) => {
    dispatchWalletDetails(id, dispatch);
  },
  onSubmit: ({ walletId, amount, to }) => {
    const payload = { walletId };
    dispatch({ type: 'TRANSACTION_SUBMITTED', payload });
    postJson(`/api/wallets/${walletId}/transaction`, { amount, to }).then(response => {
      if (response.error) {
        payload.error = response.error;
        dispatch({ type: 'TRANSACTION_ERROR', payload });
      } else {
        payload.data = response.data;
        payload.txId = response.data.txid;
        dispatch({ type: 'TRANSACTION_SENT', payload });
      }
    }).catch(error => {
      dispatch({ type: 'TRANSACTION_ERROR', payload: { error: error.message } });
    });
  }
});

export const WalletSend = connect(mapStateToProps, mapDispatchToProps)(WalletSendComponent);
export default { WalletSend };
