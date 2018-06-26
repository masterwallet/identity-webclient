import React from 'react';

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
  