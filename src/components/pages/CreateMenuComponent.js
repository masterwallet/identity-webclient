import React from 'react';
import RadioButtonGroup from './../controls/RadioButtonGroup';

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

export const WizardPanel = ({ title, children }) => (
  <div className="container-fluid">
    <h3 style={{ 
      textAlign: 'center', borderBottom: '1px darkgreen solid', 
      background: '#eff0ff', padding: 5, boxShadow: '0px 4px 10px #eee',
      marginBottom: 15
    }}>
      {title}
    </h3>
    <div style={{ width: 300, margin: '0px auto'}}>
      {children}
    </div>
  </div>
);

// TODO: reduce disable props correctly
// TODO: continue
export const CreateMenuComponent = ({ setup }) => (
  <WizardPanel title='Choose Your Actions'>
    <RadioButtonGroup options={options} onChange={() => (false)} />
  </WizardPanel>
);

