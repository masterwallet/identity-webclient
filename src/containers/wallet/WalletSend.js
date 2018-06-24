import { connect } from 'react-redux';
import { WalletSendComponent } from './../../components/wallet';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WalletSend = connect(mapStateToProps, mapDispatchToProps)(WalletSendComponent);
export default { WalletSend };
