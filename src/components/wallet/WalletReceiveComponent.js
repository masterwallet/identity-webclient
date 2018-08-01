import React from 'react';
import { WalletPanel } from './../panel/index';
import { JDentIcon } from './../jdenticon/index';
import { Address } from './../controls/Address';
import QRCode from 'qrcode.react';
import Esc from './../panel/Esc';

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
    const { object} = wallet; // unused: , isLoading, error
    const { id, address } = object; // unused: id,network, testnet, name, icon
    return (
      <WalletPanel {...object} back={true}>
        <Esc to={`/wallets/${id}/balance`} />
        {address ? (
          <div>
            <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.receive}</h3>
            <div style={{ margin: '0px auto', width: 180 }}>
              <QRCode value={address} style={{ width: 180, height: 180 }}/>
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold', margin: '20px 0px' }}>
              {_t.address}:<br />
              <Address value={address} />
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
