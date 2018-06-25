import { connect } from 'react-redux';
import { ImportWalletNetworkComponent } from './../../../components/add/import/ImportWalletNetworkComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ImportWalletNetwork = connect(mapStateToProps, mapDispatchToProps)(ImportWalletNetworkComponent);
export default { ImportWalletNetwork };
