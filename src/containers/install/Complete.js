import { connect } from 'react-redux';
import { CompleteComponent } from './../../components/install/CompleteComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Complete = connect(mapStateToProps, mapDispatchToProps)(CompleteComponent);
export default { Complete };
