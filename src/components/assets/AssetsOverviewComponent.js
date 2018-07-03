import React from 'react';
import { WizardPanel } from './../panel/index';
import { Totals } from './../panel/Totals';
// import { AssetsList } from './../panel/AssetsList';
import styled from 'styled-components';
import { JDentIcon } from './../jdenticon/index';

const _t = {
  assetsOverview: 'Assets Overview',
  wallets: 'Wallets and Accounts'
};

const mockWallets = [
  {
    address: '0xEE0F46382d49804D9367Cf9c11D1Fcc78632887B',
    assets: 4,
    network: 'EOS',
    icon: '/networks/EOS.png'
  },
  {
    address: '0x111F46382d49804D9367Cf9c11D1Fcc786128c7c',
    assets: 2,
    network: 'ETH',
    icon: '/networks/ETH.png'
  },
  {
    address: '0x000F46382d49804D9367Cf9c11D1Fcc78634447B',
    assets: 12,
    network: 'BTC',
    icon: '/networks/BTC.png'
  },
  {
    address: '23838-93923-30033930',
    assets: 3,
    network: 'KUCOIN',
    icon: '/exchanges/kucoin.png'
  }
];

const AssetTable = styled.table`
  border: 0px transparent solid;
  border-radius: 20px;
  width: 100%;
  margin-top: 20px;
  box-shadow: 0px 0px 40px #f5f3f5;

  thead th {
    color: #8663f5;
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
  tbody td.address {
    font-size: 12px;
    text-align: center;
  }
  tbody td .network {
    font-size: 13px;
    font-weight: bold;
    color: #5ec68a;
    text-align: center;
  }
  tbody td .assets {
    font-size: 12px;
    color: #444;
    text-align: center;
  }
`;
const AssetsList = ({ list, title }) => {
  const shortAddress = (value) => (value.substring(0, 6) + " ... " + value.substring(value.length - 10));
  return (
    <AssetTable>
      <thead>
        <tr>
          <th colSpan={4}>{title}</th>
        </tr>
      </thead>
      <tbody>
        {list.map(({ address, network, icon, assets }) => (
          <tr key={address}>
            <td style={{ padding: '2px' }}>
              <JDentIcon size={48} value={address}  style={{ background: '#fff' }}/>
            </td>
            <td className="address">
              {shortAddress(address)}
            </td>
            <td>
              <div className="network">
                { network }
              </div>
              <div className="assets">
                {assets} assets
              </div>
            </td>
            <td>
              {icon ? <img style={{ width: 32, height: 'auto' }} src={icon} alt="" /> : false}
            </td>
          </tr>
        ))}
        <tr className="last"><th colSpan={4}></th></tr>
      </tbody>
    </AssetTable>
  );
};


export const AssetsOverviewComponent = () => (
  <WizardPanel title={_t.assetsOverview}>
    <Totals value="3,440" currency="USD" />
    <AssetsList list={ mockWallets } title={mockWallets.length + ' ' + _t.wallets} />
  </WizardPanel>
);
