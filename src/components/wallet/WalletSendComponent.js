import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import { WalletPanel } from './../panel/index';
import { JDentIcon } from './../jdenticon/index';
import TextInput from './../controls/TextInput';

const _t = {
  send: 'Send Assets',
  toAddress: 'To The Address',
  imageForVerification: 'Image For Verification'
};

export class WalletSendComponent extends React.Component {

  state = {
    to: '',
    qty: 0
  };

  onChange = (field, value) => {
    this.setState({ [field]: value });
  };
  componentWillMount() {
    const id = this.props.match.params.walletId;
    this.props.onInit({id});
  }

  render() {
    const { wallet } = this.props;
    const { object } = wallet; // unused: isLoading, error
    // const { id, address, network, testnet, name, icon } = object;
    const { qty, to } = this.state;
    return (
      <WalletPanel {...object} back={true}>
        {/* TODO: SEND BUTTON in TOP RIGHT CORNER */}
        <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.send}</h3>
        <div style={{ alignItems: 'center', display: 'flex', width: 200, margin: '0px auto' }}>
          <TextInput value={qty} autofocus={true} onChange={v => this.onChange('qty', v)} style={{ width: 150, textAlign: 'center' }}/>
          <div style={{ fontWeight: 'bold' }}>&nbsp; ETH</div>
        </div>
        <h3 style={{ marginTop: 20, fontSize: 18, textAlign: 'center', color: '#8760f6' }}>
          {_t.toAddress}
        </h3>
        <div>
          <TextInput value={to} onChange={v => this.onChange('to', v)} style={{ width: '100%', textAlign: 'center' }}/>
        </div>
        {to ? [
          <div key={1} style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>{_t.imageForVerification}</div>,
          <div key={2} style={{ margin: '0px auto', width: 100,  background: '#fff' }}>
            <JDentIcon value={to} size={100} />
          </div>
        ] : false}
      </WalletPanel>
    );
  }
};
