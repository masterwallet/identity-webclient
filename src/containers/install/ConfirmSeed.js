import { connect } from 'react-redux';
import { ConfirmSeedComponent } from './../../components/install/ConfirmSeedComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ConfirmSeed = connect(mapStateToProps, mapDispatchToProps)(ConfirmSeedComponent);
export default { ConfirmSeed };
