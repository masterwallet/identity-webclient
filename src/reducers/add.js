const initialState = {
  operation: '',
  create: {
      name: '',
      network: 'ETH',
      testnet: false,
      rpcRoot: ''
  },
  import: {
      name: '',
      network: 'ETH',
      testnet: false,
      rpcRoot: ''
  },
  watch: {
      name: '',
      network: 'ETH',
      testnet: false,
      rpcRoot: ''
  },
  exchange: {
      name: '',
      exchange: ''
  }
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
        return { ...state, [section]: copy };
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
