import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { WalletBalanceComponent } from './../../components/wallet/WalletBalanceComponent';
import { dispatchWalletDetails, dispatchWalletTransactionsHistory } from './../../services/WalletStatus';
import { fetchDelete } from './../../services/ApiRequest';
import { historyNeedsReload } from './../../services/Utils';

const mapStateToProps = state => state;

let controller = null;
const mapDispatchToProps = dispatch => ({
  onAbort: () => {
    controller.abort();
  },
  onInit: ({ id, props }) => {
    controller = dispatchWalletDetails({ walletId: id, dispatch, props });
    const { history } = props;
    if (historyNeedsReload({ history })) {
      dispatchWalletTransactionsHistory({ walletId: id, dispatch });
    }
  },
  onDelete: ({ id }) => {
    dispatch({ type: 'WALLET_DELETE_REQUEST' });
    fetchDelete(`/api/wallets/${id}`).then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_DELETE_ERROR', payload: { error: response.error } });
      } else {
        dispatch({ type: 'WALLET_DELETED' });
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_DONE' }); // needReload = true
        dispatch(push('/wallets'));
      }
    });
  },
  onPrintRedirect: ({ id, secure }) => {
    dispatch(push(`/wallets/${id}/print/${secure}`));
  },
});

export const WalletBalance = connect(mapStateToProps, mapDispatchToProps)(WalletBalanceComponent);
export default { WalletBalance };
