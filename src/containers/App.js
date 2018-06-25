import React from 'react';
import { Switch, Route } from 'react-router-dom'; // withRouter

import ReduxToastr from 'react-redux-toastr';
import { SelectStorage } from './pages/SelectStorage';
// import { Wallet } from './pages/Wallet';
// import { Import } from './pages/Import';
import { CreateMenu } from './pages/CreateMenu';
import { Settings } from './pages/Settings';
import { Unlock } from './pages/Unlock';
import { AssetsOverview } from './pages/AssetsOverview';
import { WalletBalance, WalletReceive, WalletSend, WalletVote, WalletAccount, WalletHistory } from './wallet/index';
import { Home } from './pages/Home';
import './App.css';
// temporary: remove in production
import { MockMenu } from './../components/MockMenu';

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
    <MockMenu />
    <Switch>
      <Route exact path='/storage' component={SelectStorage} />
      {/*<Route path='/create/wallet/:network' component={WalletCreate} />*/}
      {/*<Route path='/create/import/:network' component={WalletCreateImported} />*/}
      {/*<Route exact path='/create/wallet' component={WalletSelectNetwork} />*/}
      {/*<Route exact path='/create/import' component={ImportSelectNetwork} />*/}
      <Route exact path='/create' component={CreateMenu} />

      <Route path='/wallets/:walletId/balance' component={WalletBalance} />
      <Route path='/wallets/:walletId/receive' component={WalletReceive} />
      <Route path='/wallets/:walletId/send'    component={WalletSend} />
      <Route path='/wallets/:walletId/vote'    component={WalletVote} />
      <Route path='/wallets/:walletId/account'    component={WalletAccount} />
      <Route path='/wallets/:walletId/history'    component={WalletHistory} />

      <Route exact path='/assets' component={AssetsOverview} />
      <Route exact path='/merged-assets' component={AssetsOverview} />
      <Route exact path='/unlock' component={Unlock} />
      <Route exact path='/settings' component={Settings} />
      <Route exact path='/' component={Home} />
     </Switch>
  </div>
);

export default App;
