import { connect } from 'react-redux';
import { postJson } from './../../../services/ApiRequest';
import { ImportWalletInputComponent } from './../../../components/add/import/ImportWalletInputComponent';
import { toastr } from 'react-redux-toastr';

const _t = {
  importError: 'Import Error'
};

const section = 'import';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({

  onSubmit: ({ network, networkId, testnet, name, privateKey, password, rpc, api, pin }) => {

    dispatch({ type: 'WALLET_WIZARD_SUBMIT_STARTED' });
    const payload = { network, networkId, testnet, name, privateKey, password, rpc, api, pin };
    postJson('/api/wallets', payload)
      .then((res) => {
        console.warn('last response=', res);
        if (!res.data.error) {
          dispatch({ type: 'WALLET_WIZARD_SUBMIT_DONE', payload: res });
        } else {
          dispatch({ type: 'WALLET_WIZARD_SUBMIT_ERROR', payload: res.data.error });
          toastr.error(_t.importError, res.data.error);
        }

      })
      .catch((e) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_ERROR', payload: e.toString() });
        toastr.error(_t.importError, e.toString());
      });
  }
});

export const ImportWalletInput = connect(mapStateToProps, mapDispatchToProps)(ImportWalletInputComponent);
export default { ImportWalletInput };
