import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import { WalletPanel } from './../panel/index';
import { JDentIcon } from './../jdenticon/index';
import QRCode from 'qrcode.react';

const _t = {
  address: 'Public Address',
  receive: 'Address To Send',
  imageForVerification: 'Image For Verification'
};

export const WalletReceiveComponent = () => {
  const address = '0xAA2303232020302302323030303030';
  const network = 'ETH';
  const name = 'My ETH Wallet';
  const icon = '/networks/ETH.png';
  return (
    <WalletPanel {...{address, name, network, icon}} back={true}>
      <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.receive}</h3>
      <div style={{ margin: '0px auto', width: 180 }}>
        <QRCode value={address} style={{ width: 180, height: 180 }} />
      </div>
      <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold', margin: '20px 0px' }}>
        {_t.address}:<br />
        {address}
      </div>
      <div style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>{_t.imageForVerification}</div>
      <div style={{ margin: '0px auto', width: 100,  background: '#fff' }}>
        <JDentIcon value={address} size={100} />
      </div>
    </WalletPanel>
  );
};
