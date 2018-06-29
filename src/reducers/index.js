import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as responsive } from 'react-responsive-redux';
import { reducer as toastr } from 'react-redux-toastr'

import install from './install';
import screen from './screen';
import setup from './setup';
import settings from './settings';
import add from './add';

const reducers = {
  router, responsive, screen, install, toastr, setup, settings, add
};
const rootReducer = combineReducers(reducers);
export default rootReducer;
