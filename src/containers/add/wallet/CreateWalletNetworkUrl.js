import { connect } from 'react-redux';
import { CreateWalletNetworkUrlComponent } from './../../../components/add/wallet/CreateWalletNetworkUrlComponent';

const mapStateToProps = state => state;
const section = 'create';
const mapDispatchToProps = dispatch => ({
  onUpdate: (value) => {
    dispatch({ type: 'UPDATE_RPC_ROOT', payload: { section, value } });
  }
});

export const CreateWalletNetworkUrl = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNetworkUrlComponent);
export default { CreateWalletNetworkUrl };
