import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'; // withRouter

import ReduxToastr from 'react-redux-toastr';
import { FirstRun } from './pages/FirstRun';
// import { Wallet } from './pages/Wallet';
// import { Import } from './pages/Import';
import { CreateMenu } from './pages/CreateMenu';
import { Settings } from './pages/Settings';
import { AssetsOverview } from './pages/AssetsOverview';
import { Home } from './pages/Home';
import { WalletBalance, WalletReceive, WalletSend, WalletVote } from './wallet';
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
      &nbsp;
      <Link to="/settings">Settings</Link>
      &nbsp;
      <Link to="/assets">Assets</Link>
    </div>
    <div style={{ textAlign: 'center '}}>
      <Link to="/wallets/1/balance">Balance</Link>
      &nbsp;
      <Link to="/wallets/2/receive">Receive</Link>
      &nbsp;
      <Link to="/wallets/3/send">Send</Link>
      &nbsp;
      <Link to="/wallets/4/vote">Vote</Link>
    </div>
    <Switch>
      <Route exact path='/first-run' component={FirstRun} />
      {/*<Route path='/create/wallet/:network' component={WalletCreate} />*/}
      {/*<Route path='/create/import/:network' component={WalletCreateImported} />*/}
      {/*<Route exact path='/create/wallet' component={WalletSelectNetwork} />*/}
      {/*<Route exact path='/create/import' component={ImportSelectNetwork} />*/}
      <Route exact path='/create' component={CreateMenu} />

      <Route path='/wallets/:walletId/balance' component={WalletBalance} />
      <Route path='/wallets/:walletId/receive' component={WalletReceive} />
      <Route path='/wallets/:walletId/send'    component={WalletSend} />
      <Route path='/wallets/:walletId/vote'    component={WalletVote} />

      <Route exact path='/assets' component={AssetsOverview} />
      <Route exact path='/settings' component={Settings} />
      <Route exact path='/' component={Home} />
     </Switch>
  </div>
);

export default App;
