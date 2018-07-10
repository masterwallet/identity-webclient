import { SecureRandom } from './../services/SecureRandom';
import { getSessionState, saveSessionState } from './../services/SessionState';

const saved = (state) => (saveSessionState('masterwallet_install', state));
const initialState = getSessionState('masterwallet_install', {
  storage: '',
  pair: 'http://127.0.0.1:7773',
  isValidStorage: false,
  isValidRemote: false,
  urlValidationError: '',
  pinCodeLength: 6,
  pinCode: '',
  pinCodeConfirm: '',
  generatedProgress: 0,
  wordsIndexes: [5, 4, 16],
  wordsEntered: [],
  dictionary: []
}, {
  entropy: new SecureRandom()
});

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
  return saved({ ...state, isValidStorage, isValidRemote });
};

export default function (state = initialState, action) {
    switch (action.type) {
      case 'UPDATE_PIN': {
        return saved({...state, pinCode: action.payload, pinCodeConfirm: '' });
      }
      case 'UPDATE_PIN_CONFIRM': {
        return saved({...state, pinCodeConfirm: action.payload });
      }
      case 'UPDATE_STORAGE': {
        return validatedStorage({...state, storage: action.payload });
      }
      case 'UPDATE_PAIR': {
        return validatedStorage({...state, pair: action.payload });
      }
      case 'INIT_DICTIONARY': {
        return saved({ ...state, dictionary: action.payload || [] });
      }
      case 'SHAKE': {
        if (state.generatedProgress < 100) {
          const entropy = state.entropy.copy();
          if ( typeof action.payload === 'object' && action.payload.length === 2) {
            entropy.seedInt8(action.payload[0]);
            entropy.seedInt8(action.payload[1]);
          } else {
            entropy.seedInt8(action.payload);
          }
          const generatedProgress = entropy.getProgress();
          const wordsIndexes = entropy.getRandomIndexes(3);
          return saved({ ...state, entropy, generatedProgress, wordsIndexes });
        }
        return state;
      }
      case 'CONFIRM_WORD': {
        const { index, value } = action.payload;
        const wordsEntered = state.wordsEntered.slice();
        wordsEntered[index] = value;
        return saved({ ...state, wordsEntered });
      }
      case 'INIT_CONFIRMATION_WORDS' : {
        const wordsEntered = action.payload.slice();
        return saved({ ...state, wordsEntered });
      }
      default:
    }
    return state
  };
