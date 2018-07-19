import { connect } from 'react-redux';
import { postJson } from './../../../services/ApiRequest';
import { CreateWalletNameComponent } from './../../../components/add/wallet/CreateWalletNameComponent';
import { toastr } from 'react-redux-toastr';

const _t = {
  creationError: 'Creation Error'
};

const section = 'create';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
  onSubmit: ({ network, networkId, testnet }) => {

    dispatch({ type: 'WALLET_WIZARD_SUBMIT_STARTED' });
    const payload = { network, networkId, testnet };
    postJson('/api/wallets', payload)
      .then((res) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_DONE', payload: res });
      })
      .catch((e) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_ERROR', payload: e.toString() });
        toastr.error(_t.creationError, e.toString());
      });
  },
  onChange: (value) => {
    dispatch({ type: 'UPDATE_NAME', payload: { section, value } });
  }
});

export const CreateWalletName = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNameComponent);
export default { CreateWalletName };
