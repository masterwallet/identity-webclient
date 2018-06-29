import { connect } from 'react-redux';
import { WatchWalletNameComponent } from './../../../components/add/watch/WatchWalletNameComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WatchWalletName = connect(mapStateToProps, mapDispatchToProps)(WatchWalletNameComponent);
export default { WatchWalletName };
