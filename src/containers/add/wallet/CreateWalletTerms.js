import { connect } from 'react-redux';
import { CreateWalletTermsComponent } from './../../../components/add/wallet/CreateWalletTermsComponent';

const section = 'create';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const CreateWalletTerms = connect(mapStateToProps, mapDispatchToProps)(CreateWalletTermsComponent);
export default { CreateWalletTerms };
