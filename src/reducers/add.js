const initialState = {
  operation: '',
  create: {
      name: ''
  },
  import: {
      name: ''
  },
  watch: {
      name: '',
  },
  exchange: {
      name: ''
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NAME': {
        const { section, value } = action.payload;
        const copy = { ...state[section], name: value };
        return { ...state, [section]: copy };
    }
    case 'UPDATE_ADD_OPERATION': {
        return {...state, operation: action.payload };
    }
    default:
  }
  return state;
};
