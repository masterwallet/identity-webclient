import { connect } from 'react-redux';
import { CreateMenuComponent } from './../../components/pages/CreateMenuComponent';
import { dispatchWalletsStatus } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: () => {
    dispatchWalletsStatus(dispatch);
  }
});

export const CreateMenu = connect(mapStateToProps, mapDispatchToProps)(CreateMenuComponent);
export default { CreateMenu };
