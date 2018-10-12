import { connect } from 'react-redux';
import { ImportWalletCompleteComponent } from './../../../components/add/import/ImportWalletCompleteComponent';

const section = 'import';
const mapStateToProps = state => ({...state, section });
const mapDispatchToProps = dispatch => ({
  onInit: () => {
    dispatch({ type: 'WALLET_WIZARD_COMPLETE' })
  }
});

export const ImportWalletComplete = connect(mapStateToProps, mapDispatchToProps)(ImportWalletCompleteComponent);
export default { ImportWalletComplete };
