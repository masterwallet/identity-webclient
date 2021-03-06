import { connect } from 'react-redux';
import { AssetsCombinedComponent } from './../../components/assets/AssetsCombinedComponent';
import { dispatchWalletsStatus } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: (props) => {
    dispatchWalletsStatus(dispatch, props);
  }
});
export const AssetsCombined = connect(mapStateToProps, mapDispatchToProps)(AssetsCombinedComponent);
export default { AssetsCombined };
