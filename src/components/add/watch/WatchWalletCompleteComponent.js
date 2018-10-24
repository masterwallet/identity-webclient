import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { NetworkIcon } from './../../assets/NetworkIcon';

const _t = {
  finished: 'Wallet added to Watch List',
  readyToUse: 'Wallet is added and is being watched',
  assets: 'My Wallets'
};

export class WatchWalletCompleteComponent extends React.Component {

  componentDidMount = () => {
    this.props.onInit();
  };

  render = () => {
    const { setup, section, add } = this.props;
    const { network, testnet, selectedNetwork } = add[section];
    const { networksConfig } = setup;
    const menu = WatchMenu({ network, testnet, networksConfig });
    if (!menu) return false;
    const step = findWizardStep(menu, '/complete');
    return (
      <WizardPanel title={_t.finished}>
        <Next to={`/wallets`} title={_t.assets}/>
  
        <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>
  
        <div style={{ textAlign: 'center', margin: '20px auto' }}>{_t.readyToUse}</div>
        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  };
};
