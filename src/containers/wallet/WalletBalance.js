import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { WalletBalanceComponent } from './../../components/wallet/WalletBalanceComponent';
import { dispatchWalletDetails } from './../../services/WalletStatus';
import { fetchJson, fetchDelete } from './../../services/ApiRequest';

const mapStateToProps = state => state;

let controller = null;
const mapDispatchToProps = dispatch => ({
  onAbort: () => {
    controller.abort();
  },
  onInit: ({ id, props }) => {
    controller = dispatchWalletDetails({ walletId: id, dispatch, props });

    const { history } = props;
    if (
      !history 
      || 
      (
        !history.loading 
        && (
          history.error 
          || !history.list 
          || history.list.length === 0
        )
      )
    ) {
      dispatch({ type: 'WALLET_HISTORY_REQUEST', payload: { walletId: id } });
      fetchJson(`/api/wallets/${id}/history`).then(response => {
        if (response.error) {
          dispatch({ type: 'WALLET_HISTORY_ERROR', payload: { walletId: id, data: response.error } });
        } else {
          dispatch({ type: 'WALLET_HISTORY_RECEIVED', payload: { walletId: id, data: response.data } });
        }
      }).catch(err => {});
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
