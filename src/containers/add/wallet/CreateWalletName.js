import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { postJson } from './../../../services/ApiRequest';
import { CreateWalletNameComponent } from './../../../components/add/wallet/CreateWalletNameComponent';
import { toastr } from 'react-redux-toastr';

const _t = {
  creationError: 'Creation Error'
};

const section = 'create';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
  onSubmit: ({ name, network, networkId, testnet }) => {

    dispatch({ type: 'WALLET_WIZARD_SUBMIT_STARTED' });
    const payload = { name, network, networkId, testnet };
    postJson('/api/wallets/generate', payload)
      .then((res) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_DONE', payload: res });
        if (res && res.data && res.data.address) {
          // Current wallet data will be used from in state:add.lastResponce.data
          // but we need to reload list of wallets to have unique names
          dispatch(push('/create/wallet'));
        }
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
