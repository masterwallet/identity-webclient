import { connect } from 'react-redux';
import { ImportWalletNetworkUrlComponent } from './../../../components/add/import/ImportWalletNetworkUrlComponent';

const section = 'import';
const mapStateToProps = state => ({ ...state, section });


const mapDispatchToProps = dispatch => ({
  onUpdateNetworkId: (value) => {
    dispatch({ type: 'UPDATE_NETWORK_ID', payload: { section, value } });
  },
  onUpdateRpcRoot: (value) => {
    dispatch({ type: 'UPDATE_RPC_ROOT', payload: { section, value } });
  }
});

export const ImportWalletNetworkUrl = connect(mapStateToProps, mapDispatchToProps)(ImportWalletNetworkUrlComponent);
export default { ImportWalletNetworkUrl };
