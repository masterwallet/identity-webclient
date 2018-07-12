import { connect } from 'react-redux';
import { CreateWalletNetworkUrlComponent } from './../../../components/add/wallet/CreateWalletNetworkUrlComponent';

const section = 'create';
const mapStateToProps = state => ({ ...state, section });

const mapDispatchToProps = dispatch => ({
  onUpdateNetworkId: (value) => {
    dispatch({ type: 'UPDATE_NETWORK_ID', payload: { section, value } });
  },
  onUpdateRpcRoot: (value) => {
    dispatch({ type: 'UPDATE_RPC_ROOT', payload: { section, value } });
  }
});

export const CreateWalletNetworkUrl = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNetworkUrlComponent);
export default { CreateWalletNetworkUrl };
