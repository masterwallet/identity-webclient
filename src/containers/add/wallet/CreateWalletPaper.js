import { connect } from 'react-redux';
import { CreateWalletPaperComponent } from './../../../components/add/wallet/CreateWalletPaperComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const CreateWalletPaper = connect(mapStateToProps, mapDispatchToProps)(CreateWalletPaperComponent);
export default { CreateWalletPaper };
