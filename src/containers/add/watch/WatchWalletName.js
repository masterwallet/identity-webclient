import { connect } from 'react-redux';
import { WatchWalletNameComponent } from './../../../components/add/watch/WatchWalletNameComponent';

const section = 'watch';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
  onChange: (value) => {
    dispatch({ type: 'UPDATE_NAME', payload: { section, value } });
  }
});
  
export const WatchWalletName = connect(mapStateToProps, mapDispatchToProps)(WatchWalletNameComponent);
export default { WatchWalletName };
