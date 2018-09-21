import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import calculateSize from 'calculate-size';
import { JDentIcon } from './../jdenticon/index';
import { WalletPanel, Totals, MyAssetsButton, MyWalletsButton } from './../panel/index';
import { AssetsList } from './../assets/AssetsList';
import Esc from './../panel/Esc';

const Send = styled.button`
  position: absolute;
  left: 135px;
  top: 65px;
  height: 70px;
  width: 70px;

  cursor: pointer;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  color: #252525;

  outline: none !important;

  border-radius: 50%;
  margin: 0px auto;
  border-left: none;
  border-right: none;
  border-top: 1px solid #6137bf;
  border-bottom: 1px solid #61c38b;
  box-shadow: 0px 0px 30px #cebdf1;
  background: transparent;

  &:hover {
    background: #efefef;
    color: #6c56f0;
  }
`;


const Receive = styled.button`
  position: absolute;
  left: -75px;
  top: 64px;
  height: 70px;
  width: 70px;

  cursor: pointer;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  color: #252525;

  outline: none !important;

  border-radius: 50%;
  margin: 0px auto;
  border-left: none;
  border-right: none;
  border-top: 1px solid #6137bf;
  border-bottom: 1px solid #61c38b;
  box-shadow: 0px 0px 30px #cebdf1;
  background: transparent;

  &:hover {
    background: #efefef;
    color: #6c56f0;
  }
`;

const QrIcon = () => (
  <svg style={{ width: 20, height: 20, background: 'transparent' }} viewBox="0 0 401.994 401.994">
    <g>
      <path d="M0,401.991h182.724V219.265H0V401.991z M36.542,255.813h109.636v109.352H36.542V255.813z"></path>
      <rect x="73.089" y="292.355" width="36.544" height="36.549"></rect>
      <rect x="292.352" y="365.449" width="36.553" height="36.545"></rect>
      <rect x="365.442" y="365.449" width="36.552" height="36.545"></rect>
      <polygon points="365.446,255.813 328.904,255.813 328.904,219.265 219.265,219.265 219.265,401.991 255.813,401.991     255.813,292.355 292.352,292.355 292.352,328.904 401.991,328.904 401.991,219.265 401.991,219.265 365.446,219.265   "></polygon>
      <path d="M0,182.728h182.724V0H0V182.728z M36.542,36.542h109.636v109.636H36.542V36.542z"></path>
      <rect x="73.089" y="73.089" width="36.544" height="36.547"></rect>
      <path d="M219.265,0v182.728h182.729V0H219.265z M365.446,146.178H255.813V36.542h109.633V146.178z"></path>
      <rect x="292.352" y="73.089" width="36.553" height="36.547"></rect>
    </g>
  </svg>
);

const RightArrowIcon = () => (
  <svg style={{ width: 20, height: 20, background: 'transparent' }} viewBox="0 0 1000 1000">
    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
      <path d="M5826.7,4016.3c-281-89.8-416.9-421.6-285.6-691.1c18.4-36.9,631.2-668,1361.4-1398.3L8231.6,595.5H4336.3H440.9l-101.4-53c-55.3-30-131.3-99.1-170.5-152C106.9,300.7,100,275.3,100,111.8c0-163.5,6.9-188.9,69.1-278.7c39.2-53,115.2-122.1,170.5-152.1L440.9-372h3895.4h3895.3L6902.5-1701.2c-730.2-732.5-1343-1361.4-1361.4-1400.5c-99.1-205-57.6-435.4,110.6-582.8c175.1-154.3,380.1-175.1,575.9-62.2C6370.3-3663.8,9823.4-194.6,9867.2-91c43.8,110.6,43.8,294.9,0,405.4C9823.4,418.1,6372.6,3885,6227.5,3970.2C6107.7,4039.4,5955.7,4057.8,5826.7,4016.3z"/>
    </g>
  </svg>
);


const _t = {
  receive: 'Receive',
  send: 'Send',
  assets: 'Assets in This Wallet',
  recentTransactions: 'Recent Transactions',
  noRecentTransactions: 'No Transactions',
  unsafeOperations: 'Unsafe Operations'
};

const calcFontSize = ({ text, maxWidth = 240 }) => {
  let options = {
    font: 'Roboto', 
    fontSize: '1rem'
  };
  let currSize = calculateSize(text, options);
  let fontSize = 1;

  while (currSize.width >= maxWidth) {
    fontSize = (fontSize - 0.1).toFixed(1);
    options.fontSize = `${fontSize}rem`;
    currSize = calculateSize(text, options);
  }
  return `${fontSize}rem`;
};

//  asset, icon, hash, date ?
const TransactionDetail = ({ transaction, walletAddress }) => {
  const txType = Object.keys(transaction.sender).indexOf(walletAddress) > -1 ? 'outgoing' : 'incoming';
  const date = transaction.timestamp ? moment.utc(transaction.timestamp * 1000) : null;
  const multiSender = Object.keys(transaction.sender).length > 1;

  const counterpart = [];
  if (txType === 'outgoing') {
    // All receivers except wallet address (in case it is used as change address)
    Object.keys(transaction.receiver).forEach(r => {
      if (r !== walletAddress) {
        counterpart.push(r);
      }
    });
  } else {
    // All senders
    Object.keys(transaction.sender).forEach(s => counterpart.push(s));
  }

  const amount = txType === 'incoming' && !multiSender ? parseFloat(transaction.receiver[walletAddress]) : false; 

  return (
    <div style={{ width: 300, textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
      {counterpart.map((addr, i) => {
        const fontSize = calcFontSize({ text: addr });
        return (
          <div key={i} style={{ margin: 5, display: 'flex' }}>
            <JDentIcon size={48} value={addr}  style={{ background: '#fff' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', margin: 5, width: 252 }}>
              <div style={{ fontSize }}>
                {addr}
              </div>
              <div style={{ display: 'flex' }}>
                <div><img src={`media/${txType}-transaction.svg`} style={{ height: 24, width: 24 }} /></div>
                <div style={{ marginLeft: 5, color: `${txType === 'incoming' ? 'green' : 'red'}` }}>
                  {amount || parseFloat(multiSender ? transaction.sender[addr] : transaction.receiver[addr])}
                </div>
                <div style={{ marginLeft: 'auto' }}>{date ? date.calendar(null, {
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'D MMM, YYYY',
                  lastDay: '[Yesterday]',
                  lastWeek: 'D MMM, YYYY',
                  sameElse: 'D MMM, YYYY'
                }) : (<div style={{ color: 'red'}}>UNCONFIRMED</div>)}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AssetTable = styled.table`
  border: 0px transparent solid;
  border-radius: 20px;
  width: 100%;
  margin-top: 20px;
  box-shadow: 0px 0px 40px #f5f3f5;

  thead th {
    color: #222;
    text-shadow: 2px 2px 10px #fff;
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
  tbody .tbl {
    display: flex;
    margin-left:  0px;
    margin-right: 10px;
  }
  tbody .estimate {
    flex: 1;
    color: #65869d;
    text-shadow: 2px 2px 10px #fff;
    font-weight: bold;
    font-size: 12px;
    text-align: right;
    white-space: nowrap;
  }
`;

export class WalletBalanceComponent extends React.Component {
  componentWillMount() {
    const id = this.props.match.params.walletId;
    this.props.onInit({ id });
  }
  componentWillUnmount() {
    this.props.onAbort();
  }
  render() {
   const { wallet, transactions } = this.props;
   const { object, isLoading, error, assets } = wallet; // unused: isLoading, error
   const { id, address } = object; // unused: address, publicKey, network, name, icon
   const walletUrl = suffix => (`/wallets/${id}/${suffix}`);

   const errorMessage = error ? error : assets.error;
   const a = assets && assets.assets ? assets.assets : [];
   return (
     <WalletPanel {...object} isLoading={isLoading}>
       {(!assets.isLoading) ? [<MyAssetsButton key={0} />, <MyWalletsButton key={1} />] : false}
       <Esc to='/wallets' />
       {errorMessage ? (
         <div className='error'>{errorMessage}</div>
       ) : (
         <div>
           <Totals value={0} currency={'USD'}>
             <Link to={walletUrl('send')}>
               <Send><div><RightArrowIcon /></div>{_t.send}</Send>
             </Link>
             <Link to={walletUrl('receive')}>
               <Receive><div><QrIcon /></div>{_t.receive}</Receive>
             </Link>
           </Totals>

           <AssetTable>
             <thead><tr><th>{a.length + ' ' + _t.assets}</th></tr></thead>
             <tbody>
              <tr>
                <td><AssetsList assets={a} currency={'USD'} /></td>
              </tr>
              <tr>
                <th style={{ textAlign: 'center', padding: 10 }}>{_t.recentTransactions}</th>
              </tr>
              {!transactions.list.length ? (
                <tr>
                  <th>{_t.noRecentTransactions}</th>
                </tr>
              ): false}
             {transactions.list.map((tr, index) => (
               <tr key={index}>
                 <td>
                   <TransactionDetail transaction={tr} walletAddress={address} />
                 </td>
               </tr>
             ))}
             <tr className="last"><th></th></tr>
             </tbody>
           </AssetTable>
           <Link to={walletUrl('unsafe')} >{_t.unsafeOperations}</Link>
        </div>
       )}
     </WalletPanel>
     );
  }
};
