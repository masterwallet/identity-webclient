import { connect } from 'react-redux';
import { WalletPrintComponent } from './../../components/wallet/index.js';
import { dispatchWalletDetails } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: ({ id, props }) => {
    dispatchWalletDetails({ walletId: id, dispatch, props });
  }
});

export const WalletPrint = connect(mapStateToProps, mapDispatchToProps)(WalletPrintComponent);
export default { WalletPrint };