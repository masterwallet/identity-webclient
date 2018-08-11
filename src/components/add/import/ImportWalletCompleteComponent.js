import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';

const _t = {
  finished: 'Wallet Can Be Managed Now',
  readyToUse: 'Wallet is imported and ready to use',
  assets: 'My Wallets'
};

export const ImportWalletCompleteComponent = ({ section, add }) => {
  const { network, testnet } = add[section];
  const menu = ImportMenu(network, testnet);
  if (!menu) return false;
  const step = findWizardStep(menu, '/complete');
  return (
    <WizardPanel title={_t.finished}>
      <Next to={`/wallets`} title={_t.assets}/>

      <div style={{ textAlign: 'center', margin: '50px auto' }}>{_t.readyToUse}</div>
      <Steps {...{step, menu}} />
    </WizardPanel>
  );
};
