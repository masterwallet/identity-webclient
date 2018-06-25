import { connect } from 'react-redux';
import { ImportWalletInputComponent } from './../../../components/add/import/ImportWalletInputComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ImportWalletInput = connect(mapStateToProps, mapDispatchToProps)(ImportWalletInputComponent);
export default { ImportWalletInput };
