import { connect } from 'react-redux';
import { WalletHistoryComponent } from './../../components/wallet/WalletHistoryComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WalletHistory = connect(mapStateToProps, mapDispatchToProps)(WalletHistoryComponent);
export default { WalletHistory };
