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
    dispatch({ type: 'TRANSACTION_SUBMITTED' });
    postJson(`/api/wallets/${walletId}/transaction`, { amount, to }).then(response => {
      const type = response.error ? 'TRANSACTION_ERROR' : 'TRANSACTION_SENT';
      dispatch({ type, payload: response });
    }).catch(error => {
      dispatch({ type: 'TRANSACTION_ERROR', payload: { error: error.message } });
    });
  }
});

export const WalletSend = connect(mapStateToProps, mapDispatchToProps)(WalletSendComponent);
export default { WalletSend };
