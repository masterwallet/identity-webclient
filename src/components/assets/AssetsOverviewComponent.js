import React from 'react';
import { WizardPanel } from './../panel/index';

const _t = {
  assetsOverview: 'Assets Overview'
};

export const AssetsOverviewComponent = () => (
  <WizardPanel title={_t.assetsOverview}>
    <h4 style={{ borderRadius: '50%', border: '1px green solid', height: 150, lineHeight: '150px', textAlign: 'center' }}>XXXX USD</h4>
    <ul>
      <li>WALLET #1: N assets, X.XX USD</li>
      <li>WALLET #2: N assets, X.XX USD</li>
      <li>EXCHANGE #3: N assets, X.XX USD</li>
      <li>WALLET #4: N assets, X.XX USD</li>
    </ul>
  </WizardPanel>
);
