import { connect } from 'react-redux';
import { ImportWalletInputComponent } from './../../../components/add/import/ImportWalletInputComponent';

const section = 'import';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const ImportWalletInput = connect(mapStateToProps, mapDispatchToProps)(ImportWalletInputComponent);
export default { ImportWalletInput };
