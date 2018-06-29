import React from 'react';
import { Switch, Route } from 'react-router-dom'; // withRouter
import ReduxToastr from 'react-redux-toastr';
import { Welcome, Terms, Privacy, SelectStorage, Shake, Seed, ConfirmSeed, Pin, ConfirmPin, Complete } from './install';
import { CreateMenu } from './pages/CreateMenu';
import { Settings } from './pages/Settings';
import { Unlock } from './pages/Unlock';
import { AssetsOverview, AssetsCombined } from './assets/index';
import { WalletBalance, WalletReceive, WalletSend, WalletVote, WalletAccount, WalletHistory } from './wallet/index';
import { Home } from './pages/Home';
import './App.css';
import { CreateWalletNetwork, CreateWalletName, CreateWalletInput, CreateWalletComplete } from './add/wallet/index';
import { WatchWalletNetwork, WatchWalletName, WatchWalletInput, WatchWalletComplete } from './add/watch/index';
import { ExchangeSelect, ExchangeName, ExchangeInput, ExchangeComplete } from './add/exchange/index';
import { ImportWalletNetwork, ImportWalletName, ImportWalletInput, ImportWalletComplete } from './add/import/index';

// Temporary: remove in production
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
    {process.env.REACT_APP_MOCK ? <MockMenu /> : false}
    <Switch>
      {/* Installation */}
      <Route exact path='/welcome' component={Welcome} />
      <Route exact path='/terms' component={Terms} />
      <Route exact path='/privacy' component={Privacy} />
      <Route exact path='/storage' component={SelectStorage} />
      <Route exact path='/shake' component={Shake} />
      <Route path='/seed/:page' component={Seed} />
      <Route exact path='/confirm/seed' component={ConfirmSeed} />
      <Route exact path='/pin' component={Pin} />
      <Route exact path='/confirm/pin' component={ConfirmPin} />
      <Route exact path='/setup/complete' component={Complete} />

      {/* Addition of Wallets / Exchange Accounts */}
      <Route exact path='/add' component={CreateMenu} />
      {/* Addition of Wallet to Manage */}
      <Route exact path='/create' component={CreateWalletNetwork} />
      <Route path='/create/:network/name' component={CreateWalletName} />
      <Route path='/create/:network/wallet' component={CreateWalletInput} />
      <Route path='/create/:network/complete' component={CreateWalletComplete} />
      {/* Addition of Wallet to Watch */}
      <Route exact path='/watch' component={WatchWalletNetwork} />
      <Route path='/watch/:network/name' component={WatchWalletName} />
      <Route path='/watch/:network/wallet' component={WatchWalletInput} />
      <Route path='/watch/:network/complete' component={WatchWalletComplete} />
      {/* Addition of Exchange Account to Watch */}
      <Route exact path='/exchange' component={ExchangeSelect} />
      <Route path='/exchange/:exchange/name' component={ExchangeName} />
      <Route path='/exchange/:exchange/account' component={ExchangeInput} />
      <Route path='/exchange/:exchange/complete' component={ExchangeComplete} />
      {/* Addition of Wallet by Importing */}
      <Route exact path='/import' component={ImportWalletNetwork} />
      <Route path='/import/:network/name' component={ImportWalletName} />
      <Route path='/import/:network/wallet' component={ImportWalletInput} />
      <Route path='/import/:network/complete' component={ImportWalletComplete} />

      {/* Wallet Managmeent */}
      <Route path='/wallets/:walletId/balance' component={WalletBalance} />
      <Route path='/wallets/:walletId/receive' component={WalletReceive} />
      <Route path='/wallets/:walletId/send'    component={WalletSend} />
      <Route path='/wallets/:walletId/vote'    component={WalletVote} />
      <Route path='/wallets/:walletId/account'    component={WalletAccount} />
      <Route path='/wallets/:walletId/history'    component={WalletHistory} />

      <Route exact path='/assets/overview' component={AssetsOverview} />
      <Route exact path='/assets/combined' component={AssetsCombined} />
      <Route exact path='/unlock' component={Unlock} />
      <Route exact path='/settings' component={Settings} />
      <Route exact path='/' component={Home} />
     </Switch>
  </div>
);

export default App;
