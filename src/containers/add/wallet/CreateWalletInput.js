import { connect } from 'react-redux';
import { CreateWalletInputComponent } from './../../../components/add/wallet/CreateWalletInputComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const CreateWalletInput = connect(mapStateToProps, mapDispatchToProps)(CreateWalletInputComponent);
export default { CreateWalletInput };
