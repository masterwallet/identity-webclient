import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { WizardPanel, Totals, SettingsButton, LockButton } from './../panel/index';
import { AssetsList } from './AssetsList';

const _t = {
  assetsCombined: 'Assets Overview',
  wallets: 'Wallets',
  assets: 'Assets'
};


const MyWallets = styled.button`
  position: absolute;
  left: -80px;
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

//const Ruler = () => (<div style={{ background: '#444', width: '100%', height: 3 }}></div>);


const AssetTable = styled.table`
  border: 0px transparent solid;
  border-radius: 20px;
  width: 100%;
  margin-top: 20px;
  box-shadow: 0px 0px 40px #f5f3f5;

  thead th {
    color: #222;
    text-shadow: 2px 2px 10px #fff;
    text-align: center;
    background: #dcd9e9;
    line-height: 50px;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  tbody tr:nth-child(even) {
    background: #d4d8de;
  }
  tbody tr:nth-child(odd) {
    background: #cfcddb;
  }
  tbody tr.last th {
    height: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  tbody .tbl {
    display: flex;
    margin-left:  0px;
    margin-right: 10px;
  }
  tbody .estimate {
    flex: 1;
    color: #65869d;
    text-shadow: 2px 2px 10px #fff;
    font-weight: bold;
    font-size: 12px;
    text-align: right;
    white-space: nowrap;
  }
`;


const numWalletsString = (wallets) => {
  const numWallets = wallets.filter(w => (w.id && w.network)).length;
  const numExchanges = wallets.filter(w => (w.id && w.exchange)).length;
  return [
    numWallets ? numWallets + ' ' + _t.wallets : '',
    numExchanges ? numExchanges + ' ' + _t.accounts : ''
  ].filter(x => !!x).join(', ');
};


export class AssetsCombinedComponent extends React.Component {
  componentWillMount() {
    this.props.onInit(this.props);
  }

  render() {
    const { assets } = this.props;
    const { wallets, status, loading } = assets;
    if (!status.isLoading) {
      const numWallets = wallets.filter(w => (w.id)).length;
      if (numWallets === 0) return (<Redirect to='/add' />);
    }

    return (
      <WizardPanel title={_t.assetsCombined}>
        <SettingsButton add={true}/>
        <LockButton />
        <Totals
          value={assets.total}
          currency={assets.currency}
          loading={loading.assets > 0 || loading.balances > 0}
        >
          <Link to='/wallets'><MyWallets>{_t.wallets}</MyWallets></Link>
        </Totals>
        <AssetTable>
          <thead>
          <tr>
            <th>{assets.assets.length + ' ' + _t.assets + ' in ' + numWalletsString(assets.wallets)}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <AssetsList {...assets} />
            </td>
          </tr>
          <tr className="last">
            <th></th>
          </tr>
          </tbody>
        </AssetTable>
      </WizardPanel>
    );
  }
}
