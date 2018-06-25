import { connect } from 'react-redux';
import { ImportWalletCompleteComponent } from './../../../components/add/import/ImportWalletCompleteComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ImportWalletComplete = connect(mapStateToProps, mapDispatchToProps)(ImportWalletCompleteComponent);
export default { ImportWalletComplete };
