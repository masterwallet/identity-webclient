import { connect } from 'react-redux';
import { WalletReceiveComponent } from './../../components/wallet';
import { dispatchWalletDetails } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: ({ id }) => {
    dispatchWalletDetails(id, dispatch);
  }
});

export const WalletReceive = connect(mapStateToProps, mapDispatchToProps)(WalletReceiveComponent);
export default { WalletReceive };
