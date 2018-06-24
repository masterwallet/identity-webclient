import { connect } from 'react-redux';
import { AssetsOverviewComponent } from './../../components/pages/AssetsOverviewComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const AssetsOverview = connect(mapStateToProps, mapDispatchToProps)(AssetsOverviewComponent);
export default { AssetsOverview };
