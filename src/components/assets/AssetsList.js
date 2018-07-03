import React from 'react';
import styled from 'styled-components';

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
  > div {
    height: 30px;
    line-height: 30px;
  }
`;

export const AssetsList = ({ assets, currency }) => (
  <AssetTable>
    {assets.map(asset => (
      <div key={asset.id} className="tbl">
        <div className="icon" style={{ width: 26 }}>
          {asset.icon ?
            <img style={{ width: 24, height: 'auto' }} src={asset.icon} alt="" /> :
            <img style={{ width: 24, height: 'auto' }} src='/media/noicon.png' alt="" />
          }
        </div>
        <div className="asset-name">{asset.name}</div>
        <div className="asset-amount">
          {asset.amount}
          {asset.estimate ? (<div className="estimate">{asset.estimate} {currency}</div>): false}
        </div>
      </div>
    ))}
  </AssetTable>
);
