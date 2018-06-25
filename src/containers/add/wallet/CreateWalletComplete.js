import { connect } from 'react-redux';
import { CreateWalletCompleteComponent } from './../../../components/add/wallet/CreateWalletCompleteComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const CreateWalletComplete = connect(mapStateToProps, mapDispatchToProps)(CreateWalletCompleteComponent);
export default { CreateWalletComplete };
