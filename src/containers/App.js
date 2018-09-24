import React from 'react';
import { Switch, Route } from 'react-router-dom'; // withRouter
import ReduxToastr from 'react-redux-toastr';
import { Welcome, Terms, Privacy, SelectStorage, Shake, Seed, ConfirmSeed, Pin, ConfirmPin, Complete } from './install';
import { CreateMenu } from './pages/CreateMenu';
import { Settings } from './pages/Settings';
import { Unlock } from './pages/Unlock';
import { AssetsOverview, AssetsCombined } from './assets/index';
import { WalletBalance, WalletReceive, WalletSend, WalletVote, WalletAccount, WalletUnsafe, WalletTransactionDetails } from './wallet/index';
import { NetworkStatus, NetworkTransaction } from './network/index';
import { Home } from './pages/Home';
import './App.css';
import { CreateWalletNetwork, CreateWalletNetworkUrl, CreateWalletName, CreateWalletInput, CreateWalletTerms, CreateWalletPaper } from './add/wallet/index';
import { WatchWalletNetwork, WatchWalletNetworkUrl, WatchWalletName, WatchWalletAddress, WatchWalletComplete } from './add/watch/index';
import { ImportWalletNetwork, ImportWalletNetworkUrl, ImportWalletName, ImportWalletInput, ImportWalletTerms, ImportWalletComplete } from './add/import/index';
import { ExchangeSelect, ExchangeName, ExchangeInput, ExchangeComplete } from './add/exchange/index';
import { AppStatus, FirstRun } from './layout/index';

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
    <FirstRun />
    <AppStatus>
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
        <Route path='/create/url' component={CreateWalletNetworkUrl} />
        <Route path='/create/name' component={CreateWalletName} />
        <Route path='/create/terms' component={CreateWalletTerms} />
        <Route path='/create/wallet' component={CreateWalletInput} />
        <Route path='/create/paper' component={CreateWalletPaper} />
        {/* Addition of Wallet to Watch */}
        <Route exact path='/watch' component={WatchWalletNetwork} />
        <Route path='/watch/url' component={WatchWalletNetworkUrl} />
        <Route path='/watch/name' component={WatchWalletName} />
        <Route path='/watch/wallet' component={WatchWalletAddress} />
        <Route path='/watch/complete' component={WatchWalletComplete} />

        {/* Addition of Wallet by Importing */}
        <Route exact path='/import' component={ImportWalletNetwork} />
        <Route path='/import/url' component={ImportWalletNetworkUrl} />
        <Route path='/import/name' component={ImportWalletName} />
        <Route path='/import/terms' component={ImportWalletTerms} />
        <Route path='/import/wallet' component={ImportWalletInput} />
        <Route path='/import/complete' component={ImportWalletComplete} />

        {/* Addition of Exchange Account to Watch */}
        <Route exact path='/exchange' component={ExchangeSelect} />
        <Route path='/exchange/name' component={ExchangeName} />
        <Route path='/exchange/account' component={ExchangeInput} />
        <Route path='/exchange/complete' component={ExchangeComplete} />

        {/* Wallet Managmeent */}
        <Route path='/wallets/:walletId/balance' component={WalletBalance} />
        <Route path='/wallets/:walletId/receive' component={WalletReceive} />
        <Route path='/wallets/:walletId/send'    component={WalletSend} />
        <Route path='/wallets/:walletId/vote'    component={WalletVote} />
        <Route path='/wallets/:walletId/account'    component={WalletAccount} />
        <Route path='/wallets/:walletId/unsafe' component={WalletUnsafe} />
        <Route path='/wallets/:walletId/transaction/:txId' component={WalletTransactionDetails} />

        {/* Network */}
        <Route path='/networks/:network'                     component={NetworkStatus} />
        <Route path='/wallets/:walletId/transactions/:txHash' component={NetworkTransaction} />

        <Route exact path='/wallets' component={AssetsOverview} />
        <Route exact path='/assets' component={AssetsCombined} />
        <Route exact path='/unlock' component={Unlock} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/' component={Home} />
       </Switch>
    </AppStatus>
  </div>
);

export default App;
