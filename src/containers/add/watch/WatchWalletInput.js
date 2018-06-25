import { connect } from 'react-redux';
import { WatchWalletInputComponent } from './../../../components/add/watch/WatchWalletInputComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WatchWalletInput = connect(mapStateToProps, mapDispatchToProps)(WatchWalletInputComponent);
export default { WatchWalletInput };
