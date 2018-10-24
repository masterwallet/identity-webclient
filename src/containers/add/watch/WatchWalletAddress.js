import { connect } from 'react-redux';
import { WatchWalletAddressComponent } from './../../../components/add/watch/WatchWalletAddressComponent';
import { postJson } from './../../../services/ApiRequest';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import Debounced from './../../../services/Debounced';

const _t = {
  watchingError: 'Watching Wallet Error',
  validationError: 'Validation Error'
};

const section = 'watch';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({

  onSubmit: ({ name, rpcRoot, api, network, networkId, testnet, address }) => {

    dispatch({ type: 'WALLET_WIZARD_SUBMIT_STARTED' });
    const payload = { name, rpcRoot, api, network, networkId, testnet, address, mode: 'watch' };
    postJson('/api/wallets', payload)
      .then((res) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_DONE', payload: res });
        if (res && res.data && res.data.id) {
          // Current wallet data will be used from in state:add.lastResponce.data
          // but we need to reload list of wallets to have unique names
          dispatch(push('/watch/complete'));
        }
      })
      .catch((e) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_ERROR', payload: e.toString() });
        toastr.error(_t.watchingError, e.toString());
      });
  },
  onUpdate: ({ network, networkId, testnet, address }) => {
    dispatch({ type: 'UPDATE_WALLET_ADDRESS', payload: { section, value: address } });
    // send to server, reduce whether it is valid or not
    if (!address) {
      dispatch({ type: 'WALLET_ADDRESS_VALIDATION_DONE', payload: {section, result: {} }})
    } else {

      Debounced.start('address-validation', () => {
        const payload = {network, networkId, testnet};
        postJson(`/api/networks/${network}/address/${address}`, payload)
          .then(res => {
            dispatch({type: 'WALLET_ADDRESS_VALIDATION_DONE', payload: {section, result: res.data}});
          }).catch((e) => {
          dispatch({type: 'WALLET_ADDRESS_VALIDATION_ERROR', payload: {section, error: e.toString()}});
          toastr.error(_t.validationError, e.toString());
        });
      }, 200);
    }
  }

});

export const WatchWalletAddress = connect(mapStateToProps, mapDispatchToProps)(WatchWalletAddressComponent);
export default { WatchWalletAddress };
