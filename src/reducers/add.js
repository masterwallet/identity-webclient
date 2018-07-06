const initialState = {
  operation: '',
  create: {
      name: '',
      testnet: false,
      rpcRoot: ''
  },
  import: {
      name: '',
      testnet: false,
      rpcRoot: ''
  },
  watch: {
      name: '',
      testnet: false,
      rpcRoot: ''
  },
  exchange: {
      name: '',
      testnet: false,
      rpcRoot: ''
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NAME': {
        const { section, value } = action.payload;
        const copy = { ...state[section], name: value };
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
