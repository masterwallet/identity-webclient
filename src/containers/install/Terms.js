import { connect } from 'react-redux';
import { TermsComponent } from './../../components/install/TermsComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Terms = connect(mapStateToProps, mapDispatchToProps)(TermsComponent);
export default { Terms };
