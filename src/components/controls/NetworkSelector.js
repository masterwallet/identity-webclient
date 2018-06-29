import React from 'react';
// import styled from 'styled-components';
import { Networks } from './../../config/Networks';
import RadioButtonGroup from './RadioButtonGroup';

export const NetworkSelector = ({ value, onChange }) => {
  const options = Networks.map(n => ({
    value: n.value,
    children: [(
      <div key={n.value} style={{ display: 'flex' }}>
        <div style={{ width: 30 }}>
          <img src={n.icon} alt='' style={{ width: 'auto', height: 25 }} />
        </div>
        <div style={{ lineHeight: '25px', fontWeight: 'bold', color: '#44c28b', width: 40, textAlign: 'center' }}>{n.value}</div>
        <div style={{ lineHeight: '25px', color: '#735cbe' }}>{n.name}</div>
      </div>
    )]
  }));
  return (<RadioButtonGroup {...{value, options, onChange}} />);
};
