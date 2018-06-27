import React from 'react';
import { Link } from 'react-router-dom'; // withRouter
import styled from 'styled-components';

const Sep = () => (<span> | </span>);
const Wrapper = styled.div`
  position: fixed;
  background: white;
  z-index: 1000;
  bottom: 0px;
  left: 0px;
  width: 100%;
`;

export const MockMenu = () => (
  <Wrapper>
    <pre key={1} style={{ textAlign: 'center', margin: 0}}>
      <Link to="/">/</Link>
      <Sep />
      <Link to="/unlock">Unlock</Link>
      <Sep />
      <Link to="/settings">Settings</Link>
      <Sep />
      <Link to="/assets">Assets</Link>
    </pre>
    <pre key={2} style={{ textAlign: 'center', margin: 0}}>
      Install: &nbsp;
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
      <Link to="/setup/complete">Complete</Link>
    </pre>
    <pre key={3} style={{ textAlign: 'center', margin: 0}}>
      <Link to="/add">Add</Link>
      <Sep />
      <Link to="/create">Create Wallet</Link>
      <Link to="/create/ETH/wallet">[2]</Link>
      <Link to="/create/ETH/complete">[3]</Link>
      <Sep />
      <Link to="/watch">Watch Wallet</Link>
      <Link to="/watch/ETH/wallet">[2]</Link>
      <Link to="/watch/ETH/complete">[3]</Link>
      <Sep />
      <Link to="/exchange">Watch Exchange</Link>
      <Link to="/exchange/KUCOIN/account">[2]</Link>
      <Link to="/exchange/KUCOIN/complete">[3]</Link>
      <Sep />
      <Link to="/import">Import Wallet</Link>
      <Link to="/import/ETH/wallet">[2]</Link>
      <Link to="/import/ETH/complete">[3]</Link>
    </pre>
    <pre key={4} style={{ textAlign: 'center', margin: 0 }}>
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
    </pre>
  </Wrapper>
);
