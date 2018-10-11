import React from 'react';
import Esc from './../panel/Esc';
import { WalletPanel } from './../panel/index';
import { JDentIcon } from './../jdenticon/index';
import { calcFontSize } from './../../services/FontResize';
import TextInput from './../controls/TextInput';
import Dropdown from './../controls/Dropdown';
import TextArea from './../controls/TextArea';

const _t = {
  send: 'Send Assets',
  toAddress: 'To the address',
  imageForVerification: 'Image for verification',
  buttonLabel: 'SEND',
  from: 'Sender:',
  to: 'Receiver:',
  change: 'Change:',
  amount: 'Amount to send',
  available: 'Available assets',
  fee: 'Fee',
  gasPrice: 'Gas price',
  gasLimit: 'Gas limit',
  asset: 'Asset',
  advanced: 'Advanced',
  back: 'Back',
  data: 'Data'
};

const blockStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 };
const h4Style = { fontSize: 16, textAlign: 'left', color: '#8760f6', marginBottom: 0 };

const assetsTotal = (wallet, assetId) => {
  let value = 0;
  let symbol = '';
  if (wallet && wallet.assets && wallet.assets.assets) {
    const asset = wallet.assets.assets[assetId];
    if (asset) {
      value = asset.value;
      symbol = asset.symbol;
    }
  }
  return `${value} ${symbol}`;
};

const isValid = ({ qty, to, availableAssets }) => (
  !isNaN(qty) && parseFloat(qty) > 0 && parseFloat(qty) <= parseFloat(availableAssets) && to.length > 0
);

const toCurrency = ({ value, unit, cmc, coef }) => {
  // coef - gasLimit in case of Ethereum
  if (cmc && cmc.price_usd) {
    const er = cmc.price_usd;
    switch (unit) {
      case 'BTC':
      case 'ETH':
        return `($${(value * er).toFixed(7)})`;
      case 'gwei':
        return `($${(value / Math.pow(10, 9) * coef * er).toFixed(4)})`;
    }
  }
  return '';
};

export class WalletSendComponent extends React.Component {

  state = {
    to: '',
    qty: 0,
    assetId: 0,
    fee: 0,
    data: '',
    gasPrice: 1, // gwei
    gasLimit: 21000, // standard limit
    advanced: false,
  };

  componentWillMount() {
    const id = this.props.match.params.walletId;
    this.props.onInit({id});
  };

  componentWillReceiveProps(nextProps) {
    // Update assets after successful transaction
    const { walletId } = this.props.match.params;
    const transactions = this.props.transactions;
    const nextTransactions = nextProps.transactions;
    
    if (transactions.txid !== nextTransactions.txid) {
      this.props.onInit({ id: walletId });
    }
    if (
      this.state.fee === 0 && transactions.fees[walletId] 
      && transactions.fees[walletId].fee
    ) {
      this.setState({ fee: transactions.fees[walletId].fee });
    }
  };

  onChange = (field, value) => {
    this.setState({ [field]: value }, () => {
      // If Ethereum, request updated gas limit
      const { network } = this.props.wallet.object;
      if (
        network === 'ETH'
        && ['qty', 'to', 'data', 'assetId'].includes(field)
      ) {
        const { walletId } = this.props.match.params;
        const { assets } = this.props.wallet;
        const { to, qty, assetId, data } = this.state;
        if (assets.assets && assets.assets[assetId]) {
          const assetObj = assets.assets[assetId];
          const asset = assetObj.symbol;
          const amount = qty;
          const contractAddress = assetObj.contractAddress;
          if (asset && to && (amount || contractAddress || data)) {
            const params = { walletId, asset, amount, to, data, contractAddress};
            this.props.estimateGas(params);
          }
        }
      }
    });
  };

  onSubmit = () => {
    const { walletId } = this.props.match.params;
    const { to, qty, assetId, fee, gasPrice, gasLimit, data } = this.state;
    const { assets } = this.props.wallet;
    if (isValid({ qty, to, availableAssets: assetsTotal(this.props.wallet, this.state.assetId) })) {
      const params = { walletId, to, amount: qty, fee, gasPrice, gasLimit, data };
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
    console.log(this.props);
    const { wallet, transactions } = this.props;
    const { object, isLoading, error, assets } = wallet;
    const { id, network } = object; // unused: address, testnet, name, icon
    const { qty, to, assetId, advanced, gasLimit } = this.state;
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
    const cmc = assets.assets && assets.assets[assetId] && assets.assets[assetId].cmc ? assets.assets[assetId].cmc : null;
    const coef = network ? (network === 'ETH' ? gasLimit : 1) : 1;

    const valid = isValid({ qty, to, availableAssets });

    return (
      <WalletPanel {...object} back={true} isLoading={isLoading}>
        <Esc to={`/wallets/${id}/balance`} />
        {errorMessage ? (
           <div className='error'>{errorMessage}</div>
        ) : (
          <div>
            <h3 style={{ fontSize: 18, textAlign: 'center', color: '#8760f6' }}>{_t.send}</h3>
            <div style={blockStyle}>
              <h4 style={h4Style} >
                {_t.amount}:
              </h4>
              <TextInput 
                value={qty} 
                autofocus={true} 
                onChange={v => this.onChange('qty', v)} 
                style={{ width: 150, textAlign: 'center' }} 
                type='number' 
                min={0} 
              />
            </div>
            <div style={blockStyle}>
              <h4 style={h4Style} >{_t.asset}: &nbsp;</h4>
              <Dropdown
                value={assetId}
                options={assetTokenSymbols}
                style={{ width: 'auto' }}
                onChange={(value) => this.onChange('assetId', value)}
              />
            </div>
            <div style={blockStyle}>
              <h4 style={h4Style} >{_t.available}:</h4>&nbsp;
              <div style={{ color: 'rgb(169,169,169)' }}>{availableAssets}</div>
            </div>
            <h3 style={{ marginTop: 20, fontSize: 18, textAlign: 'center', color: '#8760f6' }}>
              {_t.toAddress}:
            </h3>
            <div>
              <TextInput value={to} onChange={v => this.onChange('to', v)} style={{ width: '100%', textAlign: 'center' }}/>
            </div>
            {/* Icon */}
            {to ? [
              <div key={1} style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>{_t.imageForVerification}</div>,
              <div key={2} style={{ margin: '0px auto', width: 100,  background: '#fff' }}>
                <JDentIcon value={to} size={100} />
              </div>
            ] : false}
            {/* Fee */}
            { fee && !fee.loading && !fee.error ? (
              advanced ? (
                <div>
                  <div style={blockStyle}>
                    <h4 style={h4Style}>{_t[fee.label]}</h4>
                    <TextInput 
                      value={this.state.fee}
                      min={0}
                      type='number'
                      step={fee.step}
                      style={{ textAlign: 'center' }} 
                      onChange={(value) => {
                        if (network === 'ETH') {
                          this.setState({ gasPrice: value });
                        } else {
                          this.setState({ fee: value });
                        }
                      }} 
                    />
                    &nbsp;
                    <div>{fee.units}</div>
                    &nbsp;
                    <a href='' onClick={(event) => {
                        event.preventDefault();
                        this.setState({ advanced: false });
                      }}
                    >
                      <button style={{ opacity: 0.5 }} className='btn btn-basic btn-sm'>
                        {_t.back}&nbsp;
                        <img src='media/back-arrow.svg' style={{ width: 20, height: 20 }} />
                      </button>
                    </a>
                  </div>
                  {fee.label2 ? (
                    <div style={blockStyle}>
                      <h4 style={h4Style}>{_t[fee.label2]}</h4>
                      <TextInput 
                        value={this.state.gasLimit}
                        min={0}
                        type='number'
                        step={fee.step}
                        style={{ textAlign: 'center' }} 
                        onChange={(value) => {
                          this.setState({ gasLimit: value })
                        }} 
                      />
                      &nbsp;
                    </div>
                  ) : false}
                  {/* Data field */}
                  <div style={blockStyle}>
                    <h4 style={h4Style}>{_t.data}:</h4>&nbsp;
                    0x
                    <TextArea 
                      value={this.state.data}
                      onChange={(text) => this.onChange('data', text)}
                    >
                    </TextArea>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={blockStyle}>
                    <h4 style={h4Style}>{_t[fee.label]}:</h4>&nbsp;
                    <Dropdown
                      value={this.state.fee}
                      options={[
                        { value: fee.min, label: `${fee.min} ${fee.units} ${toCurrency({ value: fee.min, unit: fee.units, cmc, coef })}` },
                        { value: fee.fee, label: `${fee.fee} ${fee.units} ${toCurrency({ value: fee.fee, unit: fee.units, cmc, coef })}` },
                        { value: fee.max, label: `${fee.max} ${fee.units} ${toCurrency({ value: fee.max, unit: fee.units, cmc, coef })}` }
                      ]}
                      style={{ width: 'auto' }}
                      onChange={(value) => {
                        if (network === 'ETH') {
                          this.setState({ gasPrice: value });
                        } else {
                          this.setState({ fee: value });
                        }
                      }}
                    />
                    <a href='' onClick={(event) => {
                        event.preventDefault();
                        this.setState({ advanced: true });
                      }}
                    >
                      <button style={{ opacity: 0.5 }} className='btn btn-basic btn-sm'>
                        {_t.advanced}&nbsp;
                        <img src='media/gears.svg' style={{ width: 20, height: 20 }} />
                      </button>
                    </a>
                  </div>
                  {fee.label2 ? (
                    <div style={blockStyle}>
                      <h4 style={h4Style}>{_t[fee.label2]}:</h4>&nbsp;
                      {coef}
                    </div>
                  ) : false}
                </div>
              )
            ) : false }
            <div style={blockStyle}>
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
            {/* Error */}
            {sender.error ? <div className='alert alert-danger'>
              {sender.error}
            </div> : false}
            {/* Latest transaction data */}
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
              </div> : false
            }
          </div>
        )}
      </WalletPanel>
    );
  }
};
