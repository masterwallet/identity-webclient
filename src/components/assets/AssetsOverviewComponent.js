import React from 'react';
import { WizardPanel } from './../panel/index';
import { Totals } from './../panel/Totals';

const _t = {
  assetsOverview: 'Assets Overview'
};

export const AssetsOverviewComponent = () => (
  <WizardPanel title={_t.assetsOverview}>
    <Totals value="3,440" currency="USD" />
    <ul>
      <li>WALLET #1: N assets, X.XX USD</li>
      <li>WALLET #2: N assets, X.XX USD</li>
      <li>EXCHANGE #3: N assets, X.XX USD</li>
      <li>WALLET #4: N assets, X.XX USD</li>
    </ul>
  </WizardPanel>
);
