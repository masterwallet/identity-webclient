import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import { WalletPanel } from './../panel/index';
import { JDentIcon } from './../jdenticon/index';
import QRCode from 'qrcode.react';

const _t = {
  address: 'Wallet Address',
  receive: 'Address To Send',
  imageForVerification: 'Image For Verification',
  pleaseSelectAccount: 'Please Select Account'
};

export class WalletReceiveComponent extends React.Component {

  componentWillMount() {
    const id = this.props.match.params.walletId;
    this.props.onInit({id});
  }

  render() {
    const { wallet } = this.props;
    const { object, isLoading, error } = wallet;
    const { id, address, network, testnet, name, icon } = object;
    return (
      <WalletPanel {...object} back={true}>
        {address ? (
          <div>
            <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.receive}</h3>
            <div style={{ margin: '0px auto', width: 180 }}>
              <QRCode value={address} style={{ width: 180, height: 180 }}/>
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold', margin: '20px 0px' }}>
              {_t.address}:<br />
              {address}
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>{_t.imageForVerification}</div>
            <div style={{ margin: '0px auto', width: 100,  background: '#fff' }}>
              <JDentIcon value={address} size={100}/>
            </div>
          </div>
        ) : (
          <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.pleaseSelectAccount}</h3>
        )}
      </WalletPanel>
    );
  }
}
