import { connect } from 'react-redux';
import { CreateWalletInputComponent } from './../../../components/add/wallet/CreateWalletInputComponent';

const section = 'create';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const CreateWalletInput = connect(mapStateToProps, mapDispatchToProps)(CreateWalletInputComponent);
export default { CreateWalletInput };
