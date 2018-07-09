import { connect } from 'react-redux';
import { ImportWalletNetworkUrlComponent } from './../../../components/add/import/ImportWalletNetworkUrlComponent';

const mapStateToProps = state => state;
const section = 'import';

const mapDispatchToProps = dispatch => ({
  onUpdateNetworkId: (value) => {
    console.info('onUpdateNetworkId', section, value);
    dispatch({ type: 'UPDATE_NETWORK_ID', payload: { section, value } });
  },
  onUpdateRpcRoot: (value) => {
    dispatch({ type: 'UPDATE_RPC_ROOT', payload: { section, value } });
  }
});

export const ImportWalletNetworkUrl = connect(mapStateToProps, mapDispatchToProps)(ImportWalletNetworkUrlComponent);
export default { ImportWalletNetworkUrl };
