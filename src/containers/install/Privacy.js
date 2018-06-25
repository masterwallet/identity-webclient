import { connect } from 'react-redux';
import { PrivacyComponent } from './../../components/install/PrivacyComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Privacy = connect(mapStateToProps, mapDispatchToProps)(PrivacyComponent);
export default { Privacy };
