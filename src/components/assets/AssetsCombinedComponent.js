import React from 'react';
import { WizardPanel } from './../panel/index';
import { Totals } from './../panel/Totals';

const _t = {
  assetsCombined: 'All Assets'
};

export const AssetsCombinedComponent = () => (
  <WizardPanel title={_t.assetsCombined}>
    <Totals value="3,440" currency="USD" />
    <ul>
      <li>ASSET #1: NNN, X.XX USD</li>
      <li>ASSET #2: NNN, X.XX USD</li>
      <li>ASSET #3: NNN, X.XX USD</li>
      <li>ASSET #4: NNN, X.XX USD</li>
    </ul>
  </WizardPanel>
);
