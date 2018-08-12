import { connect } from 'react-redux';
import { CreateMenuComponent } from './../../components/pages/CreateMenuComponent';
import { dispatchWalletsStatus } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: (props) => {
    dispatchWalletsStatus(dispatch, props);
  }
});

export const CreateMenu = connect(mapStateToProps, mapDispatchToProps)(CreateMenuComponent);
export default { CreateMenu };
