import { connect } from 'react-redux';
import { UnlockComponent } from './../../components/pages/UnlockComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Unlock = connect(mapStateToProps, mapDispatchToProps)(UnlockComponent);
export default { Unlock };
