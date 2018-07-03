import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as responsive } from 'react-responsive-redux';
import { reducer as toastr } from 'react-redux-toastr'

import install from './install';
import screen from './screen';
import setup from './setup';
import settings from './settings';
import add from './add';
import assets from './assets';
import wallet from './wallet';

const reducers = {
  router, responsive, screen, install, toastr, setup, settings, add, assets, wallet
};
const rootReducer = combineReducers(reducers);
export default rootReducer;
