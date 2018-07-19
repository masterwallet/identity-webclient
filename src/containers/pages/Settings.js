import { connect } from 'react-redux';
import { SettingsComponent } from './../../components/pages/SettingsComponent';
import { push } from 'react-router-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onEsc: () => {
    dispatch(push('/wallets'));
  },
  onChange: (field, value) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { field, value }});
  }
});

export const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
export default { Settings };
