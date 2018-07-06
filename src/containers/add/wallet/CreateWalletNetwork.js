import { connect } from 'react-redux';
import { CreateWalletNetworkComponent } from './../../../components/add/wallet/CreateWalletNetworkComponent';

const mapStateToProps = state => state;
const section = 'create';
const mapDispatchToProps = dispatch => ({
  onUpdateNetwork: (value) => {
    dispatch({ type: 'UPDATE_NETWORK', payload: { section, value } });
  },
  onUpdateTestnet: (value) => {
    dispatch({ type: 'UPDATE_TESTNET', payload: { section, value }});
  }
});
  

export const CreateWalletNetwork = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNetworkComponent);
export default { CreateWalletNetwork };
