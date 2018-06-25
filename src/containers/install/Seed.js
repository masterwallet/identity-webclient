import { connect } from 'react-redux';
import { SeedComponent } from './../../components/install/SeedComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Seed = connect(mapStateToProps, mapDispatchToProps)(SeedComponent);
export default { Seed };
