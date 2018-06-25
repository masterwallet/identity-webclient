import { connect } from 'react-redux';
import { CreateWalletNetworkComponent } from './../../../components/add/wallet/CreateWalletNetworkComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const CreateWalletNetwork = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNetworkComponent);
export default { CreateWalletNetwork };
