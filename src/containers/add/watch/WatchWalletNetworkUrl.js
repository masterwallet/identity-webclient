import { connect } from 'react-redux';
import { WatchWalletNetworkUrlComponent } from './../../../components/add/watch/WatchWalletNetworkUrlComponent';

const mapStateToProps = state => state;
const section = 'watch';
const mapDispatchToProps = dispatch => ({
  onUpdate: (value) => {
    dispatch({ type: 'UPDATE_RPC_ROOT', payload: { section, value } });
  }
});

export const WatchWalletNetworkUrl = connect(mapStateToProps, mapDispatchToProps)(WatchWalletNetworkUrlComponent);
export default { WatchWalletNetworkUrl };
