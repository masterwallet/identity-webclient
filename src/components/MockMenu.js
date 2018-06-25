import React from 'react';
import { Link } from 'react-router-dom'; // withRouter

const Sep = () => (<span> | </span>);

export const MockMenu = () => ([
  <pre style={{ textAlign: 'center', margin: 0}}>
    <Link to="/">/</Link>
    <Sep />
    <Link to="/unlock">Unlock</Link>
    <Sep />
    <Link to="/settings">Settings</Link>
    <Sep />
    <Link to="/assets">Assets</Link>
  </pre>
  ,
  <pre style={{ textAlign: 'center', margin: 0}}>
    <Link to="/welcome">Welcome</Link>
    <Sep />
    <Link to="/terms">Terms</Link>
    <Sep />
    <Link to="/privacy">Privacy</Link>
    <Sep />
    <Link to="/storage">Storage</Link>
    <Sep />
    <Link to="/shake">Shake</Link>
    <Sep />
    <Link to="/seed/1">Write Seed</Link>
    <Sep />
    <Link to="/confirm/seed">Confirm Seed</Link>
    <Sep />
    <Link to="/pin">Create PIN</Link>
    <Sep />
    <Link to="/confirm/pin">Confirm PIN</Link>
    <Sep />
    <Link to="/ready">Ready</Link>
  </pre>
  ,
  <pre style={{ textAlign: 'center', margin: 0}}>
    <Link to="/create">Create</Link>
    <Sep />
    <Link to="/create/wallet">Create Wallet (Select)</Link>
    <Link to="/create/ETH/wallet">[ETH]</Link>
    <Link to="/create/ETH/done">[Done]</Link>
    <Sep />
    <Link to="/watch/wallet">Watch Wallet (Select)</Link>
    <Link to="/watch/ETH/wallet">[ETH]</Link>
    <Sep />
    <Link to="/watch/exchange">Watch Exchange</Link>
    <Sep />
    <Link to="/import/wallet">Import Wallet (Select)</Link>
    <Link to="/import/ETH/wallet">[ETH]</Link>
    <Link to="/import/ETH/done">[Done]</Link>
  </pre>
  ,
  <pre style={{ textAlign: 'center', margin: 0 }}>
    <Link to="/wallets/1/balance">Balance</Link>
    <Sep />
    <Link to="/wallets/2/receive">Receive</Link>
    <Sep />
    <Link to="/wallets/3/send">Send</Link>
    <Sep />
    <Link to="/wallets/3/history">History</Link>
    <Sep />
    <Link to="/wallets/3/account">Account</Link>
    <Sep />
    <Link to="/wallets/4/vote">Vote</Link>
  </pre >
]);
