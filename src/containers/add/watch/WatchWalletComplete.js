import { connect } from 'react-redux';
import { WatchWalletCompleteComponent } from './../../../components/add/watch/WatchWalletCompleteComponent';

const section = 'watch';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const WatchWalletComplete = connect(mapStateToProps, mapDispatchToProps)(WatchWalletCompleteComponent);
export default { WatchWalletComplete };
