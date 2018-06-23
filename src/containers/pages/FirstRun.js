import { connect } from 'react-redux';
import { FirstRunComponent } from './../../components/pages/FirstRunComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const FirstRun = connect(mapStateToProps, mapDispatchToProps)(FirstRunComponent);
export default { FirstRun };
