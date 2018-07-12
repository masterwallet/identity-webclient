import { connect } from 'react-redux';
import { WatchWalletNetworkUrlComponent } from './../../../components/add/watch/WatchWalletNetworkUrlComponent';

const section = 'watch';
const mapStateToProps = state => ({ ...state, section });

const mapDispatchToProps = dispatch => ({

  onUpdateNetworkId: (value) => {
    dispatch({ type: 'UPDATE_NETWORK_ID', payload: { section, value } });
  },
  onUpdateRpcRoot: (value) => {
    dispatch({ type: 'UPDATE_RPC_ROOT', payload: { section, value } });
  }
  
});

export const WatchWalletNetworkUrl = connect(mapStateToProps, mapDispatchToProps)(WatchWalletNetworkUrlComponent);
export default { WatchWalletNetworkUrl };
