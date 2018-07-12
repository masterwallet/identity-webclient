import React from 'react';
import RadioButtonGroup from './../controls/RadioButtonGroup';
import { WizardPanel, Next, Prev } from './../panel/index';

const _t = {
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
  {
    label: 'Watch Exchange Account',
    value: 'exchange',
    comment: 'Add Exchange Account API keys to watch the balance'
  },
  {
    label: 'Import Existing Wallet',
    value: 'import',
    comment: 'Import Another Wallet (providing private key or keystore)'
  }
];

export class CreateMenuComponent extends React.Component {
  state = {
    to: ''
  }
  onChange = (value) => {
    this.setState({ to: value });
  }

  render() {
    // const { setup } = this.props;
    // const { serverStatus } = setup;
    // const noServer = (serverStatus || !serverStatus.isRunning);
    // const serverData = (serverStatus && serverStatus.data) ? serverStatus.data : {};
    const hdWallet = false;
    const adjustedOptions = hdWallet ? options.map((o, index) =>(
      (index > 0) ? {...o, disabled: true } : o
    )) : options;
    const { to } = this.state;
    return (
      <WizardPanel title={_t.choose}>
        {to ? <Next to={`/${to}`} title={_t.next} /> : false }
        <Prev to='/wallets' title={_t.myWallets} />
        
        <div style={{ marginTop: 20 }}></div>
        <RadioButtonGroup options={adjustedOptions} onChange={this.onChange} />
      </WizardPanel>
    );
  }
}
