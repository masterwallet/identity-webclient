import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'; // withRouter

import ReduxToastr from 'react-redux-toastr';
import { FirstRun } from './pages/FirstRun';
// import { Wallet } from './pages/Wallet';
// import { Import } from './pages/Import';
import { CreateMenu } from './pages/CreateMenu';
import { Settings } from './pages/Settings';
// import { Assets } from './pages/Assets';
import { Home } from './pages/Home';

import './App.css';

const toastr = {
  timeout: 4000,
  newestOnTop: false,
  position: 'bottom-left',
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut'
};

const App = () => (
  <div className="App">
    <ReduxToastr {...toastr} progressBar />
    <div style={{ textAlign: 'center '}}>
      <Link to="/">/</Link>
      &nbsp;
      <Link to="/first-run">First Run</Link>
      &nbsp;
      <Link to="/create">Create</Link>
    </div>
    <Switch>
      <Route exact path='/first-run' component={FirstRun} />
      {/*<Route path='/create/wallet/:network' component={Wallet.Create} />*/}
      {/*<Route path='/create/import/:network' component={Import.Create} />*/}
      {/*<Route exact path='/create/wallet' component={Wallet.SelectNetwork} />*/}
      {/*<Route exact path='/create/import' component={Import.SelectNetwork} />*/}
      <Route exact path='/create' component={CreateMenu} />
      {/*
       <Route path='/assets/:asset/balance' component={Assets.Balance} />
       <Route path='/assets/:asset/receive' component={Assets.Receive} />
       <Route path='/assets/:asset/send'    component={Assets.Send} />
       <Route path='/assets/:asset/vote'    component={Assets.Vote} />
       <Route exact path='/assets' component={Assets.List} />
      */}
      <Route exact path='/settings' component={Settings} />
      <Route exact path='/' component={Home} />
     </Switch>
  </div>
);

export default App;
