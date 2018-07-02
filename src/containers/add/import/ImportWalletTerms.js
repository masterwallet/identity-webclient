import { connect } from 'react-redux';
import { ImportWalletTermsComponent } from './../../../components/add/import/ImportWalletTermsComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ImportWalletTerms = connect(mapStateToProps, mapDispatchToProps)(ImportWalletTermsComponent);
export default { ImportWalletTerms };
