import { connect } from 'react-redux';
import { WalletAccountComponent } from './../../components/wallet/WalletAccountComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WalletAccount = connect(mapStateToProps, mapDispatchToProps)(WalletAccountComponent);
export default { WalletAccount };
