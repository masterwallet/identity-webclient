import React from 'react';
import { Steps } from './../../controls/Steps';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';

const _t = {
  finished: 'Wallet added to Watch List',
  readyToUse: 'Wallet is created and ready to use',
  assets: 'Assets'
};

export const WatchWalletCompleteComponent = ({ match }) => {
  const { network } = match.params;
  const menu = WatchMenu(network);
  const step = findWizardStep(menu, '/complete');
  return (
    <WizardPanel title={_t.finished}>
      <Next to={`/assets/overview`} title={_t.assets}/>
      <div style={{ textAlign: 'center', margin: '50px auto' }}>{_t.readyToUse}</div>
      <Steps {...{step, menu}} />
    </WizardPanel>
  );
};
