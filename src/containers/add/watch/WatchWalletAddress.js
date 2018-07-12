import { connect } from 'react-redux';
import { WatchWalletAddressComponent } from './../../../components/add/watch/WatchWalletAddressComponent';

const section = 'watch';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const WatchWalletAddress = connect(mapStateToProps, mapDispatchToProps)(WatchWalletAddressComponent);
export default { WatchWalletAddress };
