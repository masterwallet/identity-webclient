import { connect } from 'react-redux';
import { WalletBalanceComponent } from './../../components/wallet/WalletBalanceComponent';
import { dispatchWalletDetails } from './../../services/WalletStatus';
import { fetchJson } from './../../services/ApiRequest';

const mapStateToProps = state => state;

let controller = null;
const mapDispatchToProps = dispatch => ({
  onAbort: () => {
    controller.abort();
  },
  onInit: ({ id }) => {
    controller = dispatchWalletDetails(id, dispatch);

    dispatch({ type: 'WALLET_HISTORY_REQUEST' });
    const start = 0, limit = 100;
    fetchJson(`/api/wallets/${id}/history?start=${start}&limit=${limit}`).then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_HISTORY_ERROR', payload: response });
      } else {
        dispatch({ type: 'WALLET_HISTORY_RECEIVED', payload: response });
      }
    }).catch(err => {

    });
  }
});

export const WalletBalance = connect(mapStateToProps, mapDispatchToProps)(WalletBalanceComponent);
export default { WalletBalance };
