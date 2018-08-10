import React from 'react';
import styled from 'styled-components';
import { SmallLoader } from './../controls/SmallLoader';

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
    text-align: left;
    flex: 1;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 0px;
    padding-left: 10px;
    padding-right: 10px;
    background: white;
    color: darkred;
    font-weight: normal;
    font-size: 10px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .asset-amount {
    text-align: right;
    flex: 1;
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
  .tbl.noerr > div {
    height: 30px;
    line-height: 30px;
  }
  .tbl.err > div {
    height: 30px;
  }
`;

export const AssetsList = ({ assets, currency }) => (
  <AssetTable>
    {assets.map(asset => (
      <div key={asset.symbol || asset.contractAddress} className={`tbl ${asset.error ? 'err' : 'noerr'}`}>
        <div className="icon" style={{ width: 26 }}>
          {asset.icon ?
            <img style={{ width: 24, height: 'auto' }} src={asset.icon} alt="" /> :
            <img style={{ width: 24, height: 'auto' }} src='/media/noicon.png' alt="" />
          }
        </div>
        {/*<pre className="asset-error">{JSON.stringify(asset, null, 2)}</pre>*/}

        {asset.error ? (
          <div className="asset-error" title={asset.error}>
            {asset.error} <br />
            <strong>{asset.contractAddress}</strong>
          </div>
        ): [
          <div key={1} className="asset-name">`
            {asset.name}
          </div>,
          <div key={2} className="asset-amount">
            {asset.isLoading ? <SmallLoader /> : (
              <div>{asset.isPending ? '... ... ' : asset.value}</div>
            )}
          </div>
        ]}
      </div>
    ))}
  </AssetTable>
);
