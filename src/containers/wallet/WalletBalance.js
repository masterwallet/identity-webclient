import { connect } from 'react-redux';
import { WalletBalanceComponent } from './../../components/wallet/WalletBalanceComponent';
import { controller, dispatchWalletDetails } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onAbort: () => {
    controller.abort()
  },
  onInit: ({ id }) => {
    dispatchWalletDetails(id, dispatch);
  }
});

export const WalletBalance = connect(mapStateToProps, mapDispatchToProps)(WalletBalanceComponent);
export default { WalletBalance };
