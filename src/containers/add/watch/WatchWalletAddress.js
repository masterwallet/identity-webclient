import { connect } from 'react-redux';
import { WatchWalletAddressComponent } from './../../../components/add/watch/WatchWalletAddressComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WatchWalletAddress = connect(mapStateToProps, mapDispatchToProps)(WatchWalletAddressComponent);
export default { WatchWalletAddress };
