import { connect } from 'react-redux';
import { CreateWalletTermsComponent } from './../../../components/add/wallet/CreateWalletTermsComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const CreateWalletTerms = connect(mapStateToProps, mapDispatchToProps)(CreateWalletTermsComponent);
export default { CreateWalletTerms };
