import React from 'react';
import { ErrorBox } from './../../components/panel/ErrorBox';
import Loader from './Loader';
import RadioButtonGroup from './RadioButtonGroup';

export const ExchangeSelector = ({ exchangesConfig, value, onChange }) => {
  const { isLoading, error, data } = exchangesConfig;
  if (isLoading) return (<Loader />);
  if (error) return <ErrorBox style={{ top: 50 }}>{error.toString()}</ErrorBox>;
  
  const options = data.map(n => ({
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
