import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { WizardPanel, Totals, SettingsButton, LockButton } from './../panel/index';
import { WalletsList } from './WalletsList';

const _t = {
  walletsOverview: 'Wallets Overview',
  wallets: 'Wallets',
  accounts: 'Exchange Accounts',
  assets: 'Assets'
};

const MyAssets = styled.button`
  position: absolute;
  left: 155px;
  top: 0px;
  height: 70px;
  width: 70px;

  cursor: pointer;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  color: #252525;

  outline: none !important;

  border-radius: 50%;
  margin: 0px auto;
  border-left: none;
  border-right: none;
  border-top: 1px solid #6137bf;
  border-bottom: 1px solid #61c38b;
  box-shadow: 0px 0px 30px #cebdf1;
  background: transparent;

  &:hover {
    background: #efefef;
    color: #6c56f0;
  }
`;

// const Ruler = () => (<div style={{ background: '#444', width: '100%', height: 3 }}></div>);

const numWalletsString = (wallets) => {
  const numWallets = wallets.filter(w => (w.id && w.network)).length;
  const numExchanges = wallets.filter(w => (w.id && w.exchange)).length;
  return [
    numWallets ? numWallets + ' ' + _t.wallets : '',
    numExchanges ? numExchanges + ' ' + _t.accounts : ''
  ].filter(x => !!x).join(', ');
};

export class AssetsOverviewComponent extends React.Component {
  componentWillMount() {
    this.props.onInit(this.props);
  }
  render() {
    const { assets } = this.props;
    const { wallets, subtotals, status, currency } = assets;
    if (!status.isLoading) {
      const numWallets = wallets.filter(w => (w.id)).length;
      if (numWallets === 0) return (<Redirect to='/add' />);
    }
    return (
      <WizardPanel title={_t.walletsOverview}>
        <SettingsButton add={true}/>
        <LockButton />
        <Totals value={assets.total} currency={currency}>
          <Link to='/assets'><MyAssets>{_t.assets}</MyAssets></Link>
        </Totals>
        <WalletsList 
          list={ assets.wallets } {...{subtotals, currency}}
          title={numWalletsString(assets.wallets)}
        />
      </WizardPanel>
    );
  }
}
