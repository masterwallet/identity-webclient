import React from 'react';
import Esc from './../panel/Esc';
import { WalletPanel } from './../panel/index';
import { JDentIcon } from './../jdenticon/index';
import { calcFontSize } from './../../services/FontResize';
import TextInput from './../controls/TextInput';
import Dropdown from './../controls/Dropdown';

const _t = {
  send: 'Send Assets',
  toAddress: 'To The Address',
  imageForVerification: 'Image For Verification',
  buttonLabel: 'SEND',
  from: 'Sender:',
  to: 'Receiver:',
  change: 'Change:',
  amount: 'Amount:',
  fee: 'Fee'
};

const assetsTotal = (wallet, assetId) => {
  let value = 0;
  if (wallet && wallet.assets && wallet.assets.assets) {
    // value = wallet.assets.assets.reduce((total, asset) => (
    //   symbol === asset.symbol ? total + parseFloat(asset.value) : total + 0
    // ), 0);
    const asset = wallet.assets.assets[assetId];
    if (asset) {
      value = asset.value;
    }
  }
  return value;
};

const isValid = ({ qty, to, availableAssets }) => (
  !isNaN(qty) && parseFloat(qty) > 0 && parseFloat(qty) <= parseFloat(availableAssets) && to.length > 0
);

export class WalletSendComponent extends React.Component {

  state = {
    to: '',
    qty: 0,
    assetId: 0,
    fee: 0
  };

  componentWillMount() {
    const id = this.props.match.params.walletId;
    this.props.onInit({id});
  };

  componentWillReceiveProps(nextProps) {
    // Update assets after successful transaction
    const transactions = this.props.transactions;
    const nextTransactions = nextProps.transactions;
    if (transactions.txid !== nextTransactions.txid) {
      this.props.onInit({ id: this.props.match.params.walletId });
    }
  };

  onChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onSubmit = () => {
    const { walletId } = this.props.match.params;
    const { to, qty, assetId, fee } = this.state;
    const { assets } = this.props.wallet;
    if (isValid({ qty, to, availableAssets: assetsTotal(this.props.wallet, this.state.assetId) })) {
      const params = { walletId, to, amount: qty, fee };
      if (assets.assets && assets.assets[assetId]) {
        const asset = assets.assets[assetId];
        params.asset = asset.symbol;
        if (asset.contractAddress) {
          params.contractAddress = asset.contractAddress;
        }
      }
      this.props.onSubmit(params);
    }
  };

  render() {
    //console.log(this.props);
    const { wallet, transactions } = this.props;
    const { object, isLoading, error, assets } = wallet; // unused: isLoading, error
    const { id, network } = object; // unused: address, network, testnet, name, icon
    const { qty, to, assetId } = this.state;
    const sender = transactions.sender[id] || false;
    const fee = transactions.fees[id] || false;
    const feeValue = this.state.fee > 0 ? this.state.fee : (
      fee && !fee.loading && !fee.error ? fee.fee : 0
    );
    const latestTx = sender && sender.latestTx ? sender.latestTx : null;
    const errorMessage = error ? error : assets.error;
    const availableAssets = assetsTotal(wallet, assetId);
    const assetTokenSymbols = assets.assets ? assets.assets.map((a, i) => ({
      value: i,
      label: a.symbol
    })) : [];
    
    const valid = isValid({ qty, to, availableAssets });

    return (
      <WalletPanel {...object} back={true} isLoading={isLoading}>
        <Esc to={`/wallets/${id}/balance`} />
        {errorMessage ? (
           <div className='error'>{errorMessage}</div>
        ) : (
          <div>
            <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.send}</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextInput 
                  value={qty} 
                  autofocus={true} 
                  onChange={v => this.onChange('qty', v)} 
                  style={{ width: 150, textAlign: 'center' }} 
                  type='number' 
                  min={0} 
                />
                <div style={{ color: 'rgb(169,169,169)' }}>{availableAssets}</div>
              </div>
              <div style={{ fontWeight: 'bold', margin: 5 }}>&nbsp;
                <Dropdown
                  value={assetId}
                  options={assetTokenSymbols}
                  style={{ width: 'auto' }}
                  onChange={(value) => this.setState({ assetId: value })}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 70 }}>
                {sender.processing 
                  ? 
                  <img src='media/loader365thumb.gif' style={{ width: 20, height: 20 }} />
                  :
                  <button 
                    className={`btn btn-success ${valid ? '' : 'disabled'}`}
                    style={{ margin: 5 }}
                    onClick={this.onSubmit}
                  >
                    {_t.buttonLabel}
                  </button>
                }
              </div>
            </div>
            { fee && !fee.loading && !fee.error ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.fee}</h3>
                <div style={{  margin: 5 }}>
                  <input
                    type='range'
                    min={fee.min}
                    max={fee.max}
                    defaultValue={fee.fee}
                    step={fee.step}
                    onChange={(event) => {
                      this.setState({ 
                        fee: event.currentTarget.value
                      }) 
                    }}
                  />
                  <div style={{ display: 'flex', fontSize: 'smaller', justifyContent: 'space-between', color: 'grey' }}>
                    <div>{fee.min}</div>&nbsp;
                    <div style={{ fontWeight: 'bold' }}>{feeValue}</div>&nbsp;
                    <div>{fee.max}</div>
                  </div>
                </div>
                <div>{fee.units}</div>
              </div>
            ) : false }
            <h3 style={{ marginTop: 20, fontSize: 18, textAlign: 'center', color: '#8760f6' }}>
              {_t.toAddress}
            </h3>
            <div>
              <TextInput value={to} onChange={v => this.onChange('to', v)} style={{ width: '100%', textAlign: 'center' }}/>
            </div>
            {sender.error ? <div className='alert alert-danger'>
              {sender.error}
            </div> : false}
            {sender[latestTx] ? 
              <div 
                className='alert alert-success'
                style={{ 
                  wordWrap: 'break-word',
                  textAlign: 'left'
                }}
              >
                <p style={{ fontSize: 'smaller' }}><b>{sender[latestTx].txid}</b></p>
                {Object.keys(sender[latestTx]).map(f => 
                  f === 'txid' 
                  ? false 
                  : (<div key={f} style={{ 
                    fontSize: calcFontSize({ text: `${_t[f]} ${sender[latestTx][f]}`, maxWidth: 255 }) 
                  }}>
                    <b>{_t[f]}</b> {sender[latestTx][f]}
                  </div>)
                )}
              </div> : false}
            {to ? [
              <div key={1} style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>{_t.imageForVerification}</div>,
              <div key={2} style={{ margin: '0px auto', width: 100,  background: '#fff' }}>
                <JDentIcon value={to} size={100} />
              </div>
            ] : false}
          </div>
        )}
      </WalletPanel>
    );
  }
};
