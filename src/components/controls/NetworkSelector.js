import React from 'react';
import { NetSwitcher } from './NetSwitcher';
import { Networks } from './../../config/Networks';
import RadioButtonGroup from './RadioButtonGroup';

export const NetworkSelector = ({ value, section, onChange, isTestNet, onTestNet }) => {
  const sortFunc = (v1, v2) => (v1.name.localeCompare(v2.name));
  const options = Networks.sort(sortFunc).map(n => {
    const disabled = (n.disabled === true) || (n.disabled && n.disabled.indexOf(section) > -1);
    return {
      value: n.value,
      shiftTop: 10,
      children: [(
        <div key={n.value} style={{ display: 'flex' }}>
          <div style={{ width: 30, lineHeight: '40px' }}>
            <img src={n.icon} alt='' style={{ width: 'auto', height: 25 }} />
          </div>
          <div style={{
            lineHeight: '40px', fontWeight: 'bold', color: disabled ? '#888' : '#44c28b', width: 40, textAlign: 'center'
          }}>{n.value}</div>
          <div style={{
            lineHeight: '40px', color: disabled ? '#888': '#735cbe'
          }}>{n.name}</div>
        </div>
      )]
    };
  });
  return (
    <div>
      <NetSwitcher isTestNet={isTestNet} onChange={onTestNet} />
      <RadioButtonGroup {...{value, options, onChange}} />
    </div>
  );
};
