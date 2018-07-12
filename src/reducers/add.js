import { Networks } from './../config/Networks';
import { getSessionState, saveSessionState } from './../services/SessionState';

const defaultNetwork = 'ETH';

const getTestNetName = (list, id) => {
  if (list && list.length) {
    const filtered = list.map(obj => ((obj.value === id) ? obj.name : false)).filter(x => !!x);
    console.info('filtered= ', filtered);
    if (filtered.length > 0) return filtered[0];
  }
  return 'Testnet';
};

const updatedName = (obj, subject) => {
  const network = obj.network;
  const selectedNetwork = Networks.filter(n => (n.value === network))[0];
  const test = obj.testnet ? ' (' + getTestNetName(selectedNetwork.testnets, obj.networkId) + ')' : '';
  return ({ ...obj, name: `My ${network} ${subject}${test}`, selectedNetwork });
};

const getRpcRoot = (network) => (
  Networks.filter(n => (n.value === network))[0].local
);

const saved = (state) => (saveSessionState('masterwallet_add', state));
const initialState = getSessionState('masterwallet_add', {
  operation: '',
  create: updatedName({
      name: '',
      network: defaultNetwork,
      testnet: false,
      networkId: '',
      rpcRoot: getRpcRoot(defaultNetwork)
  }, defaultNetwork, 'Wallet'),
  import: updatedName({
      name: '',
      network: defaultNetwork,
      networkId: '',
      testnet: false,
      rpcRoot: getRpcRoot(defaultNetwork),
      secret: {}
  }, defaultNetwork, 'Wallet'),
  watch: updatedName({
      name: '',
      network: defaultNetwork,
      networkId: '',
      testnet: false,
      rpcRoot: getRpcRoot(defaultNetwork)
  }, defaultNetwork, 'Wallet'),
  exchange: updatedName({
      name: '',
      exchange: '',
      secret: {}
  }, defaultNetwork, 'Account')
}, {});

const updatedWalletNames = (state) => {
  const updatedCreate = updatedName(state.create, 'Wallet');
  const updatedImport = updatedName(state.import, 'Wallet');
  const updatedWatch = updatedName(state.watch, 'Wallet');
  const updatedExchange = updatedName(state.exchange, 'Account');
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
        return saved({ ...state, [section]: copy });
    }
    case 'UPDATE_NETWORK': {
        const { section, value } = action.payload;
        const copy = { ...state[section], network: value, rpcRoot: getRpcRoot(value) };
        return saved(updatedWalletNames({ ...state, [section]: copy }));
    }
    case 'UPDATE_NETWORK_ID': {
      const { section, value } = action.payload;
      const copy = { ...state[section], networkId: value };
      return saved(updatedWalletNames({ ...state, [section]: copy }));
    }
    case 'UPDATE_TESTNET': {
        const { section, value } = action.payload;
        const copy = { ...state[section], testnet: !!value };
        return saved({ ...state, [section]: copy });
    }
    case 'UPDATE_RPC_ROOT': {
        const { section, value } = action.payload;
        const copy = { ...state[section], rpcRoot: value };
        return saved({ ...state, [section]: copy });
    }
    case 'UPDATE_SECRET': {
        const { section, name, value } = action.payload;
        const copy = { ...state[section] }
        copy.secret[name] = value
        return saved({ ...state, [section]: copy });
    }
    case 'UPDATE_ADD_OPERATION': {
        return saved({...state, operation: action.payload });
    }
    default:
  }
  return state;
};
