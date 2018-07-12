import { connect } from 'react-redux';
import { CreateWalletNetworkUrlComponent } from './../../../components/add/wallet/CreateWalletNetworkUrlComponent';

const section = 'create';
const mapStateToProps = state => ({ ...state, section });

const mapDispatchToProps = dispatch => ({
  onUpdate: (value) => {
    dispatch({ type: 'UPDATE_RPC_ROOT', payload: { section, value } });
  }
});

export const CreateWalletNetworkUrl = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNetworkUrlComponent);
export default { CreateWalletNetworkUrl };
