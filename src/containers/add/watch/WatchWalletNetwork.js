import { connect } from 'react-redux';
import { WatchWalletNetworkComponent } from './../../../components/add/watch/WatchWalletNetworkComponent';

const section = 'watch';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
  onUpdateNetwork: (value) => {
    dispatch({ type: 'UPDATE_NETWORK', payload: { section, value } });
  },
  onUpdateTestnet: (value) => {
    dispatch({ type: 'UPDATE_TESTNET', payload: { section, value }});
  }
});

export const WatchWalletNetwork = connect(mapStateToProps, mapDispatchToProps)(WatchWalletNetworkComponent);
export default { WatchWalletNetwork };
