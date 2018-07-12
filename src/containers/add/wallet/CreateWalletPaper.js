import { connect } from 'react-redux';
import { CreateWalletPaperComponent } from './../../../components/add/wallet/CreateWalletPaperComponent';

const section = 'create';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const CreateWalletPaper = connect(mapStateToProps, mapDispatchToProps)(CreateWalletPaperComponent);
export default { CreateWalletPaper };
