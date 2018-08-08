import { connect } from 'react-redux';
import { WatchWalletAddressComponent } from './../../../components/add/watch/WatchWalletAddressComponent';
import { fetchJson, postJson } from './../../../services/ApiRequest';
import { toastr } from 'react-redux-toastr';

const _t = {
  watchingError: 'Watching Error',
  validationError: 'Validation Error'
};

const section = 'watch';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({

  onSubmit: ({ network, networkId, testnet, address }) => {

    dispatch({ type: 'WALLET_WIZARD_SUBMIT_STARTED' });
    const payload = { network, networkId, testnet, address };
    postJson('/api/wallets/watch', payload)
      .then((res) => {
        dispatch({ type: 'WALLET_WIZARD_SUBMIT_DONE', payload: res });
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
      fetchJson(`/api/networks/${network}/address/${address}`)
        .then(res => { 
          console.log("VALIDATION:", res);
          dispatch({ type: 'WALLET_ADDRESS_VALIDATION_DONE', payload: {section, result: res.data }});
        }).catch((e) => {
          dispatch({ type: 'WALLET_ADDRESS_VALIDATION_ERROR', payload: {section, error: e.toString()  }});
          toastr.error(_t.validationError, e.toString());
        });
    }
  }

});

export const WatchWalletAddress = connect(mapStateToProps, mapDispatchToProps)(WatchWalletAddressComponent);
export default { WatchWalletAddress };
