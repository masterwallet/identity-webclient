import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as responsive } from 'react-responsive-redux';
import { reducer as toastr } from 'react-redux-toastr'

import install from './install';
import screen from './screen';
import setup from './setup';

const reducers = {
  router, responsive, screen, install, toastr, setup
};
const rootReducer = combineReducers(reducers);
export default rootReducer;
