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
    //onUpdateSecret: (name, value) => {
    //    dispatch({ type: 'UPDATE_SECRET', payload: { section, name, value } });
    //},
  onSubmit: ({ network, networkId, testnet, privateKey, keyStore, password }) => {

    dispatch({ type: 'WALLET_WIZARD_SUBMIT_STARTED' });
    const payload = { network, networkId, testnet, privateKey, keyStore, password };
    postJson('/api/wallets/import', payload)
      .then((res) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_DONE', payload: res });
      })
      .catch((e) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_ERROR', payload: e.toString() });
        toastr.error(_t.importError, e.toString());
      });
  }
});

export const ImportWalletInput = connect(mapStateToProps, mapDispatchToProps)(ImportWalletInputComponent);
export default { ImportWalletInput };
