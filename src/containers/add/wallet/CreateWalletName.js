import { connect } from 'react-redux';
import { CreateWalletNameComponent } from './../../../components/add/wallet/CreateWalletNameComponent';

const section = 'create';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
  onChange: (value) => {
    dispatch({ type: 'UPDATE_NAME', payload: { section, value } });
  }  
});

export const CreateWalletName = connect(mapStateToProps, mapDispatchToProps)(CreateWalletNameComponent);
export default { CreateWalletName };
