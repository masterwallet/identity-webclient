import { connect } from 'react-redux';
import { ImportWalletNetworkComponent } from './../../../components/add/import/ImportWalletNetworkComponent';

const mapStateToProps = state => state;
const section = 'import';
const mapDispatchToProps = dispatch => ({
  onUpdateNetwork: (value) => {
    dispatch({ type: 'UPDATE_NETWORK', payload: { section, value } });
  },
  onUpdateTestnet: (value) => {
    dispatch({ type: 'UPDATE_TESTNET', payload: { section, value }});
  }
});


export const ImportWalletNetwork = connect(mapStateToProps, mapDispatchToProps)(ImportWalletNetworkComponent);
export default { ImportWalletNetwork };
