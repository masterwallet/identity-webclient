import React from 'react';
import styled from 'styled-components';
import Esc from './../panel/Esc';
import { WalletPanel } from './../panel/index';
import { SmallLoader } from './../controls/SmallLoader';

const AlertButtons = styled.div`
display: flex;
justify-content: space-between!important;
`;

const _t = {
  deleteWallet: 'Delete wallet',
  deleteConfirmation: "Are you sure to delete current wallet from MasterWallet? You can import it again anytime once you have Private Key.",
  deleteBtnText: 'Delete',
  cancelBtnText: 'Cancel',
};

const DeletionStage = ({ deletionStatus, onCancel, onDelete }) => {
  const { deletion, deleted, isDeleting, error } = deletionStatus;
  if (!deletion) {
    return false;
  } else {
    return (
      <div style={{ marginTop: '10px' }} className='alert alert-danger'>
        {(() =>{
          if (deletion === 'confirming' ) {
            return (
            <div>
              {_t.deleteConfirmation}
              <AlertButtons>
                <button className='btn' onClick={onCancel}>{_t.cancelBtnText}</button>
                <button className='btn btn-danger' onClick={onDelete}>{_t.deleteBtnText}</button>
              </AlertButtons>
            </div>
            );
          } else if (isDeleting) {
            return <SmallLoader />;
          } else if (error) {
            return (<b>{error}</b>);
          }
        })()}
      </div>
    );
  }
};

export class WalletUnsafeComponent extends React.Component {

  state = {
    deletion: false, // possible states: confirming (show dialog), processing (deletion request sent to server)
  };

  componentWillMount = () => {
    const id = this.props.match.params.walletId;
    this.props.onInit({ id });
  };

  onDelete = () => {
    const id = this.props.match.params.walletId;
    this.setState({ deletion: 'processing' });
    this.props.onDelete({ id });
  };

  render () {
    //console.log(this.props);
    const { wallet } = this.props;
    const { object, isLoading, error, assets, deletionStatus } = wallet; 
    const { id } = object;
    const errorMessage = error; // no need to display assets error
    return (
      <WalletPanel {...object} isLoading={isLoading || assets.isLoading} back={true} >
        {errorMessage ? ( <div className='error'>{errorMessage}</div> ) 
          : (
            <div>
              <div>
                <button className='btn btn-danger' onClick={() => this.setState({ deletion: 'confirming' })}>
                  {_t.deleteWallet}
                </button>
                <DeletionStage {...{ 
                  deletionStatus: { ...deletionStatus, ...this.state },
                  onCancel: () => { this.setState({ deletion: false }) },
                  onDelete: this.onDelete,
                  errorMessage: this.state.deletionError
                }} />
              </div>
              <div>
                Print wallet
              </div>
            </div>
        )}
      </WalletPanel>
    );
  };
};