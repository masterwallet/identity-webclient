import { connect } from 'react-redux';
import { CreateWalletNameComponent } from './../../../components/add/wallet/CreateWalletNameComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const CreateWalletName = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNameComponent);
export default { CreateWalletName };
