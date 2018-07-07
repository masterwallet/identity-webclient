import React from 'react';
// import styled from 'styled-components';
import { Exchanges } from './../../config/Exchanges';
import RadioButtonGroup from './RadioButtonGroup';

export const ExchangeSelector = ({ value, onChange }) => {
  const options = Exchanges.map(n => ({
    value: n.value,
    shiftTop: 10,
    children: [(
      <div key={n.value} style={{ display: 'flex' }}>
        <div style={{ lineHeight: '40px', width: 30 }}>
          <img src={n.icon} alt='' style={{ width: 'auto', height: 25 }} />
        </div>
        <div style={{ lineHeight: '40px', color: '#735cbe' }}>{n.name}</div>
      </div>
    )]
  }));
  return (<RadioButtonGroup {...{value, options, onChange}} />);
};
