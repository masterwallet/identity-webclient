import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RadioButtonGroup from './../controls/RadioButtonGroup';
import { WizardPanel, Next, Prev } from './../panel/index';

const Notice = styled.div`
  text-align: center;
  font-size: 12px;
`;

const _t = {
  yourOptionsAreLimited: 'Your options are limited because of chosen storage type (HD Wallet)',
  choose: 'Please Choose Your Action',
  next: 'Next',
  myWallets: 'My Wallets'
};

const options = [
  {
    label: 'Create New Wallet',
    value: 'create',
    comment: 'Create New Secure Wallet'
  },
  {
    label: 'Watch Existing Wallet',
    value: 'watch',
    comment: 'Safely Add Wallet to Watch List (just by providing its public address)'
  },
/*  {
    label: 'Watch Exchange Account',
    value: 'exchange',
    comment: 'Add Exchange Account API keys to watch the balance'
  },*/
  {
    label: 'Import Existing Wallet',
    value: 'import',
    comment: 'Import Another Wallet (providing private key)'
  }
];

export class CreateMenuComponent extends React.Component {
  state = {
    to: 'create'
  };
  onChange = (value) => {
    this.setState({ to: value });
  };

  isHdWallet = (props) => {
    const { setup } = props;
    const { serverStatus } = setup;
    const { data } = serverStatus;
    return data.installation === 'hdwallet';
  };

  componentWillMount() {
    this.props.onInit(this.props);
  }

  render() {
    const hdWallet = this.isHdWallet(this.props);
    const adjustedOptions = hdWallet ? options.map((o, index) =>(
      (index > 0) ? {...o, disabled: true } : o
    )) : options;
    const { to } = this.state;
    const canContinue = !!to;

    const { assets } = this.props;
    const { wallets, status } = assets;
    const numWallets = wallets.filter(w => (w.id)).length;
    const canGoToWallets = (!status.isLoading && numWallets > 0);
    return (
      <WizardPanel title={_t.choose}>
        <Next to={`/${to}`} title={_t.next} disabled={!canContinue} />
        {canGoToWallets ? <Prev to='/wallets' title={_t.myWallets} /> : false}

        {hdWallet ? <Notice>{_t.yourOptionsAreLimited}</Notice> : false}
        <div style={{ marginTop: 20 }}></div>
        <RadioButtonGroup value={to} options={adjustedOptions} onChange={this.onChange} />
        {canGoToWallets ? <div style={{ marginTop: 20, textAlign: 'center' }}><Link to='/wallets'>Back to Wallets</Link></div> : false}
      </WizardPanel>
    );
  }
}
