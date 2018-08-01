import { connect } from 'react-redux';
import { WalletBalanceComponent } from './../../components/wallet/WalletBalanceComponent';
import { dispatchWalletDetails } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: ({ id }) => {
    dispatchWalletDetails(id, dispatch);
  }
});

export const WalletBalance = connect(mapStateToProps, mapDispatchToProps)(WalletBalanceComponent);
export default { WalletBalance };
