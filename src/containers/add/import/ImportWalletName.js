import { connect } from 'react-redux';
import { ImportWalletNameComponent } from './../../../components/add/import/ImportWalletNameComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ImportWalletName = connect(mapStateToProps, mapDispatchToProps)(ImportWalletNameComponent);
export default { ImportWalletName };
