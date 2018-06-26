import React from 'react';
import RadioButtonGroup from './../controls/RadioButtonGroup';
import { WizardPanel } from './../panel/WizardPanel';

const options = [
  { 
    label: 'Create New Wallet', value: 'create', 
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
    disabled: true,
    comment: 'Add Exchange Account API keys to watch the balance'
  },
  { 
    label: 'Import Existing Wallet', 
    value: 'import', 
    disabled: true,
    comment: 'Import Another Wallet (providing private key or keystore)'
  }
];

// TODO: reduce value prop correctly
// TODO: continue
export const CreateMenuComponent = ({ setup }) => (
  <WizardPanel title='Choose Your Action'>
    <RadioButtonGroup options={options} onChange={() => (false)} />
  </WizardPanel>
);

