import { connect } from 'react-redux';
import { SettingsComponent } from './../../components/pages/SettingsComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
export default { Settings };
