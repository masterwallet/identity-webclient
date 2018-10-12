// import { Networks } from './../config/Networks';
// import { Exchanges } from './../config/Exchanges';
import { getSessionState, saveSessionState } from './../services/SessionState';

const defaultNetwork = 'ETH';

const getTestNetName = (list, id) => {
  if (list && list.length) {
    const filtered = list.map(obj => ((obj.value === id) ? obj.name : false)).filter(x => !!x);
    if (filtered.length > 0) return filtered[0];
  }
  return 'Testnet';
};

const updatedName = (obj, subject, exchange = false, config = []) => {
  const network = obj.network;
  const selectedNetwork = (config ? config.filter(n => (n.value === network))[0] : {}) || {};
  const networkName = exchange && selectedNetwork ? selectedNetwork.name : network;
  const test = obj.testnet && !exchange ? ' (' + getTestNetName(selectedNetwork.testnets, obj.networkId) + ')' : '';
  // todo: copy RPC root and API from selectedNetwork
  return ({ ...obj, name: `My ${networkName} ${subject}${test}`, selectedNetwork });
};

const saved = (state) => {
  const stateCopy = { ...state };
  // delete stateCopy.networksConfig;
  // delete stateCopy.exchangesConfig;
  return saveSessionState('masterwallet_add', stateCopy);
};

const initialState = getSessionState('masterwallet_add', {
  operation: '',
  create: updatedName({
      name: '',
      network: defaultNetwork,
      testnet: false,
      networkId: ''
  }, 'Wallet', false),
  import: updatedName({
      name: '',
      network: defaultNetwork,
      networkId: '',
      testnet: false,
      secret: {}
  }, 'Wallet', false),
  watch: updatedName({
      name: '',
      address: '',
      validation: {
        isLoading: false,
        result: {}
      },
      network: defaultNetwork,
      networkId: '',
      testnet: false
  }, 'Wallet', false),
  exchange: updatedName({
      name: '',
      network: '',
      secret: {}
  }, 'Account', true),
  lastResponse: {}
}, {
  isLoading: false,
  lastError: '',
  networksConfig: [],
  exchangesConfig: []
});

const updatedWalletNames = (state) => {
  const updatedCreate = updatedName(state.create, 'Wallet', false, state.networksConfig);
  const updatedImport = updatedName(state.import, 'Wallet', false, state.networksConfig);
  const updatedWatch = updatedName(state.watch, 'Wallet', false, state.networksConfig);
  const updatedExchange = updatedName(state.exchange, 'Account', true, state.exchangesConfig);
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
        const copy = { ...state[section], network: value, networkId: '' };
        // if (section !== 'exchange') copy.rpcRoot = getRpcRoot(value);
        return saved(updatedWalletNames({ ...state, [section]: copy }));
    }
    case 'UPDATE_NETWORK_ID': {
      const { section, value } = action.payload;
      const copy = { ...state[section], networkId: value };
      return saved(updatedWalletNames({ ...state, [section]: copy }));
    }
    case 'UPDATE_TESTNET': {
        const { section, value } = action.payload;
        const copy = { ...state[section], testnet: !!value, networkId: '' };
        return saved({ ...state, [section]: copy });
    }
    case 'UPDATE_RPC_ROOT': {
        const { section, value } = action.payload;
        const copy = { ...state[section], rpcRoot: value };
        return saved({ ...state, [section]: copy });
    }
    case 'UPDATE_WALLET_ADDRESS': {
      const { section, value } = action.payload;
      const copy = { ...state[section], address: value };
      return saved({ ...state, [section]: copy });
    }

    // 3 cases:
    // address validation started
    // address validation finished ok
    // address validation finished fail

    case 'WALLET_ADDRESS_VALIDATION_STARTED': {
      const { section } = action.payload;
      const validation = { isLoading: true, result: {} };
      const copy = { ...state[section], validation };
      return saved({ ...state, [section]: copy });
    }

    case 'WALLET_ADDRESS_VALIDATION_DONE': {
      const { section, result } = action.payload;
      const validation = { isLoading: false, result };
      const copy = { ...state[section], validation };
      return saved({ ...state, [section]: copy });
    }
    case 'WALLET_ADDRESS_VALIDATION_ERROR': {
      const { section, error } = action.payload;
      const validation = { isLoading: false, result: { error } };
      const copy = { ...state[section], validation };
      return saved({ ...state, [section]: copy });
    }

    case 'UPDATE_API_ROOT': {
      const { section, value } = action.payload;
      const copy = { ...state[section], apiRoot: value };
      return saved({ ...state, [section]: copy });
    }
    case 'UPDATE_SECRET': {
        const { section, name, value } = action.payload;
        const copy = { ...state[section] };
        copy.secret[name] = value;
        return saved({ ...state, [section]: copy });
    }
    case 'UPDATE_ADD_OPERATION': {
        return saved({...state, operation: action.payload });
    }

    case 'WALLET_WIZARD_SUBMIT_STARTED': {
      return { ...state, isLoading: true, lastError: '', lastResponse: {} };
    }
    case 'WALLET_WIZARD_SUBMIT_DONE': {
      return { ...state, isLoading: false, lastError: '', lastResponse: action.payload };
    }
    case 'WALLET_WIZARD_SUBMIT_ERROR': {
      return { ...state, isLoading: false, lastError: action.payload, lastResponse: {} };
    }
    case 'WALLET_WIZARD_COMPLETE': {
      return { ...state, isLoading: false, lastError: '', lastResponse: {} };
    }
    case 'CONFIG_NETWORKS_RECEIVED': {
      const { data } = action.payload;
      const networksConfig = data.networks;
      const exchangesConfig = data.exchanges;
      return updatedWalletNames({ ...state, networksConfig, exchangesConfig });
    }

    default:
  }
  return state;
};
