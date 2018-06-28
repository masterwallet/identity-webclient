import React from 'react';
// import styled from 'styled-components';
import { Exchanges } from './../../config/Exchanges';
import RadioButtonGroup from './RadioButtonGroup';

export const ExchangeSelector = ({ value, onChange }) => {
  const options = Exchanges.map(n => ({
    value: n.value,
    children: [(
      <div style={{ display: 'flex' }}>
        <div style={{ width: 30 }}>
          <img src={n.icon} alt='' style={{ width: 'auto', height: 25 }} />
        </div>
        <div style={{ lineHeight: '25px', color: '#735cbe' }}>{n.name}</div>
      </div>
    )]
  }));
  return (<RadioButtonGroup {...{value, options, onChange}} />);
};
