import connect from 'react-redux';

const SelectNetwork = connect()(WalletSelectNetwork);
const Create = connect()(WalletCreate);

const Wallet = {
  Create, SelectNetwork
};
export default { Wallet }
