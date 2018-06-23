import { connect } from 'react-redux';
import { CreateMenuComponent } from './../../components/pages/CreateMenuComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const CreateMenu = connect(mapStateToProps, mapDispatchToProps)(CreateMenuComponent);
export default { CreateMenu };
