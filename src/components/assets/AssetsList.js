import React from 'react';
import styled from 'styled-components';
import { SmallLoader } from './../controls/SmallLoader';
import { formatAssetValue } from './../../services/Utils';

const CmcInfoTable = styled.div`
  display: flex;
  .price { color: #666; flex: 1; white-space: nowrap; font-size: 11px; font-family: monospace; }
  .label { color: #666; }

  .positive, .negative, .neutral { text-align: right; font-size: 11px; font-family: monospace; }
  .positive { color: darkgreen; }
  .negative { color: darkred; }
  .neutral { color: #444; }
`;

const nicePrice = ({ price, currency }) => {
  if (!price) return '';

  const curr = (currency || 'usd').toUpperCase();
  const precision = (currency === 'eth' || currency === 'btc') ? 6: 2;
  const value = parseFloat(price).toFixed(precision);
  return value + ' ' + curr;
};

const CmcInfo = (props) => {
  const currency = (props.currency || 'usd').toLowerCase();
  const priceField = `price_${currency}`;
  // const total = props.value * props[priceField];
  const change = props.percent_change_24h;
  const changeClassName = change > 0 ? 'positive' : ((change < 0) ? 'negative' : 'neutral');
  return (
    <CmcInfoTable>
      <div className='price'>
        <span className="label">Price: </span>
        {nicePrice({price: props[priceField], currency})}
      </div>
      <div className={changeClassName}>
        {change}%
        <span className="label"> 24hr</span>
      </div>
    </CmcInfoTable>
  );
};

const AssetTable = styled.div`
 .asset-name {
    font-size: 14px;
    font-weight: bold;
    text-shadow: 2px 2px 10px #afacba;
    text-align: left;
    color: #8663f5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 185px;
    padding-left: 5px;
  }

  .asset-error {

    flex: 1;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 5px;
    padding-right: 5px;
    background: white;
    color: darkred;
    font-weight: normal;
    font-size: 10px;
    word-break: break-all;
    text-align: center;
  }

  .asset-amount {
    text-align: right;
    flex: 1;
    width: 100%;
    color: #000;
    font-weight: bold;
    font-size: 14px;
  }

  border-left: 3px #b99ff5 solid;
  background: #ebe6f2;
  margin-top: 3px;
  margin-bottom: 5px;
  padding-left: 5px;

  .icon {
    margin-top: 0px;
  }
  .symbol {
    color: #444;
    margin-right: 5px;
  }
  .tbl.noerr .asset-row {
    height: 30px;
    line-height: 30px;
  }
  .tbl.err .asset-row {
    height: 30px;
  }
  .tbl.noerr .asset-row-cmc {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-family: monospace;
  }

  .asset-row {
    display: flex;
    width: 100%;
  }
  .asset-rows {
    width: 100%;
  }
`;

const limit = 1e-5; // fix this - to be used from settings
export const AssetsList = ({ assets, currency }) => (
  <AssetTable>
    {assets.filter(a => (a.symbol))
      .filter(a => a.isLoading || a.isPending || a.error || (typeof a.value !== 'undefined' && parseFloat(a.value) > limit))
      .map((asset, i) => (
      <div 
        key={i}
        //key={asset.symbol || asset.contractAddress || Math.random()}
        className={`tbl ${asset.error ? 'err' : 'noerr'}`}
      >
        <div className="icon" style={{ width: 26 }}>
          {asset.icon ?
            <img style={{ width: 24, height: 'auto' }} src={asset.icon} alt="" /> :
            <img style={{ width: 24, height: 'auto' }} src='media/noicon.png' alt="" />
          }
        </div>
        <div className="asset-rows">
          <div className="asset-row">
            <div key={1} className="asset-name">
              {asset.symbol !== asset.name ? <span className="symbol">{asset.symbol}</span> : false}
              {asset.name}
              {(!asset.symbol && !asset.name && asset.isLoading) ? <SmallLoader /> : false}
            </div>
            <div key={2} className="asset-amount">
              {asset.isLoading ? <SmallLoader /> : (
                <span>
                  {asset.isPending ?
                    <span style={{ color: '#888' }}>(please wait...)</span> :
                    (asset.error ? '?' : formatAssetValue(asset.value))}
                </span>
              )}
            </div>
          </div>
          {asset.cmc ? <div className="asset-row-cmc"><CmcInfo {...asset.cmc} value={asset.value} /></div>: false}
          {asset.error ? (
            <div className="asset-error" title={asset.error}>
              {asset.error} &nbsp; <strong>{asset.contractAddress}</strong>
            </div>
          ) : false}

        </div>
      </div>
    ))}
  </AssetTable>
);
