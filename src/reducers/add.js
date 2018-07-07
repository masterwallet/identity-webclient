import { Networks } from './../config/Networks';

const defaultNetwork = 'ETH';
const updatedName = (obj, network, subject) => ({ ...obj, name: `My ${network} ${subject}` });

const initialState = {
  operation: '',
  selectedNetwork: Networks.filter(n => (n.value === defaultNetwork))[0],
  create: updatedName({
      name: '',
      network: defaultNetwork,
      testnet: false,
      rpcRoot: ''
  }, defaultNetwork, 'Wallet'),
  import: updatedName({
      name: '',
      network: defaultNetwork,
      testnet: false,
      rpcRoot: ''
  }, defaultNetwork, 'Wallet'),
  watch: updatedName({
      name: '',
      network: defaultNetwork,
      testnet: false,
      rpcRoot: ''
  }, defaultNetwork, 'Wallet'),
  exchange: updatedName({
      name: '',
      exchange: ''
  }, defaultNetwork, 'Account')
};

const updatedWalletNames = (state) => {
  const network = state.selectedNetwork.name;
  const updatedCreate = updatedName(state.create, network, 'Wallet');
  const updatedImport = updatedName(state.import, network, 'Wallet');
  const updatedWatch = updatedName(state.watch, network, 'Wallet');
  const updatedExchange = updatedName(state.exchange, network, 'Account');
  return {
    ...state,
    create: updatedCreate,
    import: updatedImport,
    watch: updatedWatch,
    exchange: updatedExchange
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NAME': {
        const { section, value } = action.payload;
        const copy = { ...state[section], name: value };
        return { ...state, [section]: copy };
    }
    case 'UPDATE_NETWORK': {
        const { section, value } = action.payload;
        const copy = { ...state[section], network: value };
        const selectedNetwork = Networks.filter(n => (n.value === value))[0];
        // TODO: preserve selectedNetwork in session storage?
        return updatedWalletNames({ ...state, [section]: copy, selectedNetwork });
    }
    case 'UPDATE_TESTNET': {
        const { section, value } = action.payload;
        const copy = { ...state[section], testnet: !!value };
        return { ...state, [section]: copy };
    }
    case 'UPDATE_RPC_ROOT': {
        const { section, value } = action.payload;
        const copy = { ...state[section], rpcRoot: value };
        return { ...state, [section]: copy };
    }
    case 'UPDATE_ADD_OPERATION': {
        return {...state, operation: action.payload };
    }
    default:
  }
  return state;
};
