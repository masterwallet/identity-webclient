import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AssetsList } from './AssetsList';
import { JDentIcon } from './../jdenticon/index';
import { NetworkIcon } from './NetworkIcon';
import { calcFontSize, getFontFamily } from './../../services/FontResize';

const _t = {
  assets: 'assets',
  asset: 'asset'
};

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
  tbody .name {
    font-size: 14px;
    font-weight: bold;
    text-shadow: 2px 2px 10px #fff;
    text-align: left;
    color: #338f81;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 185px;
    padding-left: 10px;
  }
  tbody .address {
    font-size: 11px;
    text-align: left;
    margin-left: 10px;
    font-family: monospace;
    color: #888;
    text-shadow: #61c38b;
  }

  tbody td .assets {
    white-space: nowrap;
    font-size: 12px;
    color: #222;
    text-align: center;
  }
  tbody td .assets strong {
    color: #000;
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
  tbody .main {
    flex: 1;
  }
  tbody .chevron {
    font-size: 20px;
    height: 30px;
    margin-right: 5px;
  }
`;

const font = getFontFamily();

export const WalletsList = ({ list, title, currency, subtotals }) => {
  const shortAddress = (value) => {
    if (!value) return '';
    return (value.substring(0, 6) + " ... " + value.substring(value.length - 10));
  };
  return (
    <AssetTable>
      <thead>
        <tr>
          <th colSpan={2}>
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {list.filter(w => !!w.id).map(({ id, name, address, publicKey, network, networkId, testnet, icon, details }) => {
          const assets = details && details.assets ? details.assets.filter(a => parseFloat(a.value) > 0) : [];
          return (
            <tr key={id}>
              <td style={{ verticalAlign: 'top' }}>
                <NetworkIcon {...{ network, icon, networkId, testnet }} />
              </td>
              <td style={{ padding: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <JDentIcon size={48} value={address || publicKey} style={{ background: '#fff' }} />
                  <div className="main">
                    <div className="name">{name}</div>
                    {address ?
                      <div className="address">{shortAddress(address)}</div> :
                      <div className="address">{shortAddress(publicKey)}</div>}
                    {subtotals[id] && subtotals[id] > 0 ? (
                      <div style={{
                        fontSize: calcFontSize({
                          text: `~ ${subtotals[id].toFixed(2)} ${currency} ${assets.length} ${_t.assets}`,
                          maxWidth: 170,
                          options: { font, fontSize: '1rem' }
                        }),
                        fontFamily: 'monospace',
                        background: 'transparent',
                        display: 'flex',
                        color: '#222',
                        lineHeight: '20px',
                        height: 20,
                        width: 180
                      }}
                      >
                        <div style={{ paddingLeft: 10 }}>
                          ~ {subtotals[id].toFixed(2)} {currency}
                        </div>
                        {assets.length >= 1 ? (
                          <div>&nbsp;<strong>{assets.length} {(assets.length === 1) ? _t.asset : _t.assets}</strong></div>
                        ) : false}
                      </div>
                    ) : false
                      /* TODO: if one of the assets in this wallet had an error, show '?'.
                               if one of the assets in this wallet have no price, show '??' (something else)
                      */
                    }
                  </div>
                  <div className="chevron">
                    <Link to={`/wallets/${id}/balance`}>
                      <svg x="0px" y="0px" width="18px" height="30px" viewBox="0 0 18 30">
                        <g><path fill="#eee" d="M0,0h9.333L18,15.001L9.333,30H0l8.667-14.999L0,0z" /></g>
                      </svg>
                    </Link>
                  </div>
                </div>
                {details && details.isLoading ? (
                  <div key={2222} className="tbl">
                    <div style={{ fontSize: 12, background: 'transparent', color: '#222', lineHeight: '20px', height: 20, textAlign: 'center', width: '100%' }}>
                      loading...
                </div>
                  </div>
                ) : false}
                {details && details.error ? (
                  <div key={3333} className="tbl">
                    <div style={{
                      fontSize: 12, marginTop: 5, color: 'darkred', lineHeight: '18px', textAlign: 'center', width: '100%',
                      borderLeft: '3px #b99ff5 solid',
                      background: '#ebe6f2'
                    }}>
                      {details.error}
                    </div>
                  </div>
                ) : false}
                {details && details.assets ? (
                  <AssetsList key={1122} {...{ subtotal: subtotals[id], assets: details.assets, currency }} />
                ) : false}

              </td>
            </tr>
          )
        })}
        <tr className="last"><th colSpan={2}></th></tr>
      </tbody>
    </AssetTable>
  );
};
