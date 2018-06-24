import { connect } from 'react-redux';
import { WalletVoteComponent } from './../../components/wallet';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const WalletVote = connect(mapStateToProps, mapDispatchToProps)(WalletVoteComponent);
export default { WalletVote };
