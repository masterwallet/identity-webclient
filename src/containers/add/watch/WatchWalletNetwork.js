import { connect } from 'react-redux';
import { WatchWalletNetworkComponent } from './../../../components/add/watch/WatchWalletNetworkComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WatchWalletNetwork = connect(mapStateToProps, mapDispatchToProps)(WatchWalletNetworkComponent);
export default { WatchWalletNetwork };
