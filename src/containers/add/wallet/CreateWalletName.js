import { connect } from 'react-redux';
import { CreateWalletNameComponent } from './../../../components/add/wallet/CreateWalletNameComponent';

const section = 'create';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const CreateWalletName = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNameComponent);
export default { CreateWalletName };
