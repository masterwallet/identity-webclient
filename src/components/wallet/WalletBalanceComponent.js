import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import FontSize from 'calc-fontsize';
import { JDentIcon } from './../jdenticon/index';
import { WalletPanel, Totals, MyAssetsButton, MyWalletsButton } from './../panel/index';
import { AssetsList } from './../assets/AssetsList';
import { calcFontSize, calcSize, getFontFamily } from './../../services/FontResize';
import Esc from './../panel/Esc';
import Modal from './../controls/Modal';
import { hasBip38 } from './../../services/Utils';

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

const SpinnerSvg = styled.svg`
  animation-name: spin;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;

  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

const Spinner = () => (
  <SpinnerSvg 
    style={{ minWidth: 17, minHeight: 17, }}
    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
  >
    <path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
    </path>
  </SpinnerSvg>
);

const _t = {
  receive: 'Receive',
  send: 'Send',
  assets: 'Assets in This Wallet',
  recentTransactions: 'Recent Transactions',
  noRecentTransactions: 'No Transactions',
  unsafeOperations: 'Unsafe Operations',
  printWallet: 'Print wallet',
  printSecuredWallet: 'Print secured wallet',
  deleteWallet: 'Delete wallet',
  deleteQuestion: 'Are you sure to delete wallet {WALLET_ADDRESS} from MasterWallet?',
  deleteNotice: 'You can import it again anytime if you have Private Key.',
  delete: 'Delete',
  cancel: 'Cancel'
};

const dateFormat = 'D MMM, YYYY';
const timeForamt = 'h:mma';

const fontFamily = getFontFamily();

//  asset, icon, hash, date ?
const TransactionDetail = ({ transaction, walletAddress, walletId }) => {
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
        const fontSize = calcFontSize({ 
          text: addr,
          maxWidth: 232, 
          options: { font: fontFamily, fontSize: '1rem' } 
        });
        
        return (
          <div key={i} style={{ margin: 5, display: 'flex' }}>
            <Link to={`/wallets/${walletId}/transaction/${transaction.txid}`} >
              <JDentIcon size={48} value={addr}  style={{ background: '#fff' }}/>
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', margin: 5, width: 232 }}>
              <div style={{ fontSize }}>
                {addr}
              </div>
              <div style={{ display: 'flex' }}>
                <div><img src={`media/${txType}-transaction.svg`} alt='' style={{ height: 24, width: 24 }} /></div>
                <div style={{ marginLeft: 5, color: `${txType === 'incoming' ? 'green' : 'red'}` }}>
                  {amount || parseFloat(multiSender ? transaction.sender[addr] : transaction.receiver[addr])}
                  &nbsp;
                  <strong>{transaction.asset}</strong>
                </div>
                <div style={{ display: 'flex', fontSize: 'smaller', flexDirection: 'column', marginLeft: 'auto', textAlign: 'right' }}>
                  <div>{date ? date.calendar(null, {
                      sameDay: '[Today]',
                      nextDay: '[Tomorrow]',
                      nextWeek: dateFormat,
                      lastDay: '[Yesterday]',
                      lastWeek: dateFormat,
                      sameElse: dateFormat
                    }) : (<div style={{ color: 'red'}}>UNCONFIRMED</div>)}
                  </div>
                  <div>{date ? date.format(timeForamt) : false }</div>
                </div>
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

const Bars = () => (
  <svg width={20} height={20} style={{ width: 20, height: 20 }} viewBox="0 0 1024 768" xmlns="http://www.w3.org/2000/svg">
    <path stroke="blue" fill="#8663f5" d="M0 192v128h768v-128h-768z m0 384h768v-128h-768v128z m0 256h768v-128h-768v128z" />
  </svg>
);

const Title = styled.div`
  float: left;
  textAlign: center;
  width: 80%
`;

const MenuButton = styled.button`
  width: 15%;
  margin: 5px;
  float: right;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  z-index: 1000;
  float: left;
  text-align: right;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
`;

const menuItems = [
  {
    action: 'print',
    text: _t.printWallet,
    mode: 'notWatch'
  },
  {
    action: 'print_secure',
    text: _t.printSecuredWallet,
    mode: 'notWatch'
  },
  {
    action: 'delete',
    text: _t.deleteWallet,
  }
];

const Menu = ({ onClick, onMenuOptionClick, menu, mode, bip38 }) => {
  // Filter items by watch only mode
  const items = menuItems.filter(item => {
    if (item.mode !== 'notWatch' || mode !== 'watch') {
      if (item.action === 'print_secure' && !bip38) {
        // do nothing
      } else {
        return true;
      }
    }
    return false;
  });
  // Find longest text of items
  let longestText = '';
  items.forEach(item => {
    if (item.text.length > longestText.length) {
      longestText = item.text;
    }
  });; 
  const left = 300 - (calcSize(longestText).width + 2*(1.5 * 16)) - 2; // 1rem = 16px

  return (
    <div className="dropdown">
      <MenuButton 
        className='btn btn-default'
        onClick={onClick}
      >
        <Bars/>
      </MenuButton>
      <DropdownMenu style={{ display: `${menu ? 'block' : 'none'}`, left }}>
        {items.map((item, i) => (
          <a 
            key={i}
            className='dropdown-item' 
            onClick={() => onMenuOptionClick(item.action)}
          ><div>{item.text}</div>
          </a> 
        ))}
      </DropdownMenu>
    </div>
  );
};

export class WalletBalanceComponent extends React.Component {

  state = {
    menu: false,
    modal: false,
  };

  componentWillMount() {
    const id = this.props.match.params.walletId;
    const { assets, wallet } = this.props;
    this.props.onInit({ id, props: { assets, wallet } });
  }

  componentWillUnmount() {
    this.props.onAbort();
  }

  componentWillReceiveProps(nextProps) {
    const currWalletId = this.props.match.params.walletId;
    const nextWalletId = nextProps.match.params.walletId;
    if (currWalletId !== nextWalletId) {
      const { assets, wallet } = this.props;
      this.props.onInit({ id: nextWalletId, props: { assets, wallet } });
    }
  }

  onMenuClick = () => {
    this.setState({ menu: !this.state.menu })
  };

  onMenuOptionClick = (option) => {
    const menu = false;
    if (option === 'delete') {
      this.setState({ modal: true, menu });
    } else if (option === 'print') {
      this.onPrint();
    } else if (option === 'print_secure') {
      this.onPrint(true);
    }
  };

  onModalClose = () => this.setState({ modal: false });

  onDelete = () => {
    const id = this.props.match.params.walletId;
    this.props.onDelete({ id });
  };

  onPrint = (secure = false) => {
    const id = this.props.match.params.walletId;
    this.props.onPrintRedirect({ id, secure });
  }; 

  render() {
   //console.log(this.props);
   const { wallet, transactions, setup } = this.props;
   const { object, isLoading, error, assets, deletionStatus } = wallet; // unused: isLoading, error
   const { id, address, network, mode } = object; // unused: address, publicKey, name, icon
   const walletAddress = network === 'ETH' ? address.toLowerCase() : address;
   const walletUrl = suffix => (`/wallets/${id}/${suffix}`);

   const errorMessage = error ? error : assets.error;
   const assetsList = assets && assets.assets ? assets.assets : [];

   const { menu, modal } = this.state;
   const { isDeleting } = deletionStatus;
   const deletionError = deletionStatus.error;
   const bip38 = hasBip38(setup, network);

   return (
     <WalletPanel {...object} isLoading={isLoading}>
       {(!assets.isLoading) ? [<MyAssetsButton key={0} />, <MyWalletsButton key={1} />] : false}
       <Esc to='/wallets' />
       {errorMessage ? (
         <div className='error'>{errorMessage}</div>
       ) : (
         <div>
           <Totals value={0} currency={'USD'}>
            {mode !== 'watch' ? (
              <Link to={walletUrl('send')}>
               <Send><div><RightArrowIcon /></div>{_t.send}</Send>
             </Link>
            ) : false}
             <Link to={walletUrl('receive')}>
               <Receive><div><QrIcon /></div>{_t.receive}</Receive>
             </Link>
           </Totals>

           <AssetTable>
             <thead>
               <tr>
                 <th>
                  <Title>{assetsList.filter(a => parseFloat(a.value) > 0).length + ' ' + _t.assets}</Title>
                  <Menu 
                    onClick={this.onMenuClick}
                    onMenuOptionClick={(option) => this.onMenuOptionClick(option)}
                    menu={menu}
                    mode={mode}
                    bip38={bip38}
                  /> 
                 </th>
                </tr>
              </thead>
             <tbody>
              <tr>
                <td><AssetsList assets={assetsList} currency={'USD'} /></td>
              </tr>
              <tr>
                <th style={{ textAlign: 'center', padding: 10 }}>{_t.recentTransactions}</th>
              </tr>
              {transactions.loading ? false : (
                transactions.error ? (
                  <tr>
                    <td>
                      <div className='alert alert-danger'>{transactions.error}</div>
                    </td>
                  </tr>
                ) : (
                  transactions.list.length === 0 ? (
                    <tr>
                      <th>{_t.noRecentTransactions}</th>
                    </tr>
                  ) : transactions.list.map((tr, index) => (
                    <tr key={index}>
                      <td>
                        <TransactionDetail
                          transaction={tr}
                          walletAddress={walletAddress}
                          walletId={id}
                        />
                      </td>
                    </tr>
                  ))
                )
              )}
             <tr className="last"><th></th></tr>
             </tbody>
           </AssetTable>
        </div>
       )}
       <Modal
        show={modal}
        onClose={this.onModalClose}
        onCancel={this.onModalClose}
        onConfirm={this.onDelete}
        title={_t.deleteWallet}
        body={(
          <div>
            {(() => {
              const parts = _t.deleteQuestion.split('{WALLET_ADDRESS}');
              return  (
                <div>
                  {parts[0]}
                  <div style={{ textAlign: 'center', wordBreak: 'break-all', marginBottom: 0 }}>
                    <strong>{address}</strong>
                    <JDentIcon 
                      size={96}
                      value={address} 
                      style={{ 
                        background: '#fff',
                        margin: '5px auto',
                      }}
                    />
                  </div>
                  {parts[1]}
                  <p>{_t.deleteNotice}</p>
                </div>
              );
            })()}
            {deletionError ? 
              <div style={{ marginTop: '10px' }} className='alert alert-danger'>
                {deletionError}
              </div> 
              : false}
          </div>
        )} 
        buttons={{
          confirm: {
            className: 'btn btn-danger',
            label: isDeleting ? '' : <i className='fa fa-check'></i>,
            title: isDeleting ? <Spinner /> : _t.delete
          },
          cancel: {
            className: 'btn btn-default',
            label: <i className='fa fa-times'></i>,
            title: _t.cancel
          }
        }}
       />
     </WalletPanel>
     );
  }
};
