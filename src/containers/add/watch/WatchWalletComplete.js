import { connect } from 'react-redux';
import { WatchWalletCompleteComponent } from './../../../components/add/watch/WatchWalletCompleteComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WatchWalletComplete = connect(mapStateToProps, mapDispatchToProps)(WatchWalletCompleteComponent);
export default { WatchWalletComplete };
