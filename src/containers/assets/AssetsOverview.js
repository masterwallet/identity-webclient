import { connect } from 'react-redux';
import { AssetsOverviewComponent } from './../../components/assets/AssetsOverviewComponent';
import { dispatchWalletsStatus } from './../../services/WalletStatus';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: () => {
    dispatchWalletsStatus(dispatch);
  }
});

export const AssetsOverview = connect(mapStateToProps, mapDispatchToProps)(AssetsOverviewComponent);
export default { AssetsOverview };
