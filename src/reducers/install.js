const initialState = {
  storage: '',
  pair: 'http://127.0.0.1:7773',
  isValidStorage: false,
  isValidRemote: false,
  urlValidationError: '',
  pinCodeLength: 6,
  pinCode: '',
  pinCodeConfirm: '',
  wordsGenerated: [],
  generated: [],
  generatedProgress: 0,
  wordsIndexes: [3, 5, 16],
  wordsEntered: []
};

const isValidUrl = str => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return (pattern.test(str));
};

const validatedStorage = (state) => {
  const { storage, pair } = state;
  const hasStorage = !!storage;
  const isValidRemote = (storage === 'remote' && isValidUrl(pair)) || storage !== 'remote';
  const isValidStorage = hasStorage && isValidRemote;
  return { ...state, isValidStorage, isValidRemote };
};

export default function (state = initialState, action) {
    switch (action.type) {
      case 'UPDATE_PIN': {
        return {...state, pinCode: action.payload, pinCodeConfirm: '' };
      }
      case 'UPDATE_PIN_CONFIRM': {
        return {...state, pinCodeConfirm: action.payload };
      }
      case 'UPDATE_STORAGE': {
        return validatedStorage({...state, storage: action.payload });
      }
      case 'UPDATE_PAIR': {
        return validatedStorage({...state, pair: action.payload });
      }
      case 'SHAKE': {

        if (state.generatedProgress < 100) {
          const generated = state.generated.slice();
          generated.push(action.payload);
          const generatedProgress = parseInt(generated.length * 100 / 500, 10);
          return { ...state, generated, generatedProgress };
        }
        return state;
      }
      case 'CONFIRM_WORD': {
        const { index, value } = action.payload;
        const wordsEntered = state.wordsEntered.slice();
        wordsEntered[index] = value;
        return { ...state, wordsEntered };
      }
      default:
    }
    return state
  };
