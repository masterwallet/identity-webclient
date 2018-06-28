import React from 'react';
import { WizardPanel } from './../panel/index';

const _t = {
  settings: 'Settings'
};

export const SettingsComponent = () => (
  <WizardPanel title={_t.settings}>
      <div style={{ marginTop: 10 }}>
        TODO:
        <ul>
          <li>Auto-Lock timeout</li>
          <li>Main fiat currency</li>
          <li>Display price diff</li>
          <li>Hide balances less than ...</li>
          <li>Display networks state</li>
          <li>Enable 2FA for transactions</li>
          <li>... TBC</li>
        </ul>
      </div>
  </WizardPanel>
);
