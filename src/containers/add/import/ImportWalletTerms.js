import { connect } from 'react-redux';
import { ImportWalletTermsComponent } from './../../../components/add/import/ImportWalletTermsComponent';

const section = 'import';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const ImportWalletTerms = connect(mapStateToProps, mapDispatchToProps)(ImportWalletTermsComponent);
export default { ImportWalletTerms };
