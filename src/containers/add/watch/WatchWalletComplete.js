import { connect } from 'react-redux';
import { WatchWalletCompleteComponent } from './../../../components/add/watch/WatchWalletCompleteComponent';

const section = 'watch';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
  onInit: () => {
    dispatch({ type: 'WALLET_WIZARD_COMPLETE' });
  }
});

export const WatchWalletComplete = connect(mapStateToProps, mapDispatchToProps)(WatchWalletCompleteComponent);
export default { WatchWalletComplete };
