import { connect } from 'react-redux';
import { WalletReceiveComponent } from './../../components/wallet';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WalletReceive = connect(mapStateToProps, mapDispatchToProps)(WalletReceiveComponent);
export default { WalletReceive };
