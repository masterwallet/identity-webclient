import React from 'react';
import { PinCode } from './../controls/PinCode';
import { WizardPanel } from './../panel/index';

const _t = {
  unlockYourWallet: 'Unlock Your Wallet',
  byEntering: 'by entering PIN-code below'
};

export const UnlockComponent = () => (
  <WizardPanel title={_t.unlockYourWallet}>
    <p style={{ textAlign: 'center', marginTop: 20 }}>{_t.byEntering}</p>
    <PinCode />
    <div style={{ margin: '20px auto', textAlign: 'center' }}>
      <img src='media/unlock.png' alt='' style={{ width: '50%', height: 'auto' }} />
    </div>
  </WizardPanel>
);
