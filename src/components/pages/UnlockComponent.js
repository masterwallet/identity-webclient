import React from 'react';
import { PinCode } from './../controls/PinCode';
import { WizardPanel } from './../panel/index';

const _t = {
  unlockYourWallet: 'Unlock Your Wallet',
  byEntering: 'by entering PIN-code below'
};

export class UnlockComponent extends React.Component {

  state = {
    value: ''
  };

  componentDidMount = () => {
    this.props.onInit();
  };

  onChange = (value) => {
    this.setState({ value });
    this.props.onChange();
  }; 

  render = () => {
    //console.log(this.props);
    const { value } = this.state;
    const { onChange } = this;
    const { onComplete, setup } = this.props;
    const { auth } = setup;

    return (
      <WizardPanel title={_t.unlockYourWallet}>
        <p style={{ textAlign: 'center', marginTop: 20 }}>{_t.byEntering}</p>
        <PinCode { ...{ value, onChange, onComplete }} />
        {auth.error ? (
          <div className='alert alert-danger'>{auth.error}</div>
        ) : false}
        <div style={{ margin: '20px auto', textAlign: 'center' }}>
          <img src='media/unlock.png' alt='' style={{ width: '50%', height: 'auto' }} />
        </div>
      </WizardPanel>
    );
  }
};

