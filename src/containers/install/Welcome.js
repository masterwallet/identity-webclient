import { connect } from 'react-redux';
import { WelcomeComponent } from './../../components/install/WelcomeComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Welcome = connect(mapStateToProps, mapDispatchToProps)(WelcomeComponent);
export default { Welcome };
