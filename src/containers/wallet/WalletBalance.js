import { connect } from 'react-redux';
import { WalletBalanceComponent } from './../../components/wallet/WalletBalanceComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WalletBalance = connect(mapStateToProps, mapDispatchToProps)(WalletBalanceComponent);
export default { WalletBalance };
