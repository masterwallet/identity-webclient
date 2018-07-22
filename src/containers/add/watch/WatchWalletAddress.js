import { connect } from 'react-redux';
import { WatchWalletAddressComponent } from './../../../components/add/watch/WatchWalletAddressComponent';
import { postJson } from './../../../services/ApiRequest';
import { toastr } from 'react-redux-toastr';

const _t = {
  watchingError: 'Watching Error'
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
        toastr.error(_t.watchError, e.toString());
      });
  }

});

export const WatchWalletAddress = connect(mapStateToProps, mapDispatchToProps)(WatchWalletAddressComponent);
export default { WatchWalletAddress };
