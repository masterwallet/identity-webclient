import React from 'react';
import styled from 'styled-components';
import { Networks } from './../../config/Networks';
import RadioButtonGroup from './RadioButtonGroup';

const NetSwitchDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  button {
    width: 50%;
    background: transparent;
  }
  button:active, button:focus {
    outline: none !important;
    box-shadow: none;
  }
  button.active {
    background: linear-gradient(rgb(255, 255, 255) 0%, rgb(237, 231, 243) 80%) rgb(237, 231, 243);
    border-color: #007bff;
    border-top: 1px #6239bf solid;
    border-bottom: 1px #61c38b solid;
  }
`;

const NetSwitcher = ({ isTestNet, onChange }) => {
  return (
    <NetSwitchDiv>
      <button
        className={`btn btn-sm ${!isTestNet ? 'active': ''}`}
        onClick={()=> (onChange(false))}
      >
        Main Net
      </button>
      <button
        className={`btn btn-sm ${!!isTestNet ? 'active': ''}`}
        onClick={() => (onChange(true))}
      >
        Test Net
      </button>
    </NetSwitchDiv>
  );
}

export const NetworkSelector = ({ value, onChange, isTestNet, onTestNet }) => {
  const options = Networks.map(n => ({
    value: n.value,
    shiftTop: 10,
    children: [(
      <div key={n.value} style={{ display: 'flex' }}>
        <div style={{ width: 30, lineHeight: '40px' }}>
          <img src={n.icon} alt='' style={{ width: 'auto', height: 25 }} />
        </div>
        <div style={{ lineHeight: '40px', fontWeight: 'bold', color: '#44c28b', width: 40, textAlign: 'center' }}>{n.value}</div>
        <div style={{ lineHeight: '40px', color: '#735cbe' }}>{n.name}</div>
      </div>
    )]
  }));
  return (
    <div>
      <NetSwitcher isTestNet={isTestNet} onChange={onTestNet} />
      <RadioButtonGroup {...{value, options, onChange}} />
    </div>
  );
};
