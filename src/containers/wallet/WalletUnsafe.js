import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { WalletUnsafeComponent } from './../../components/wallet/index.js';
import { dispatchWalletDetails } from './../../services/WalletStatus';
import { fetchDelete } from './../../services/ApiRequest';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: ({ id }) => {
    dispatchWalletDetails(id, dispatch);
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
  }
});

export const WalletUnsafe = connect(mapStateToProps, mapDispatchToProps)(WalletUnsafeComponent);
export default { WalletUnsafe };