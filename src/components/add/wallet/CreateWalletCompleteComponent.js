import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';

const _t = {
  finished: 'Wallet is Ready to Use',
  readyToUse: 'Wallet is created and ready to use',
  assets: 'Assets'
}

export const CreateWalletCompleteComponent = ({ match }) => {
  const { network } = match.params;
  return (
    <WizardPanel title={_t.finished}>
      <Next to={`/assets/overview`} title={_t.assets} />
      <div style={{ textAlign: 'center', margin: '50px auto' }}>{_t.readyToUse}</div>
      <Steps {...{ step: 3, menu: CreateMenu(network) }} />
    </WizardPanel>
  );
};
