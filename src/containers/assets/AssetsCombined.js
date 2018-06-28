import { connect } from 'react-redux';
import { AssetsCombinedComponent } from './../../components/assets/AssetsCombinedComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const AssetsCombined = connect(mapStateToProps, mapDispatchToProps)(AssetsCombinedComponent);
export default { AssetsCombined };
