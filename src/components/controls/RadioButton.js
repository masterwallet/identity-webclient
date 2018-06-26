import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/label-has-for */
export const RadioButton = ({ value, side, label, checked, onChange }) => {
  // TODO: disabled property
  const onClick = () => { onChange(value); };
  const styleTop = { display: 'flex', alignContent: 'center', alignItems: 'flex-start', cursor: 'pointer', width: 50 };
  const styleLabel = { flex: 1, marginLeft: '5px', color: '#000', fontWeight: 'normal' };
  const chkAtLeft = (!side || side === 'left');
  const styleCheck = { textAlign: chkAtLeft ? 'left' : 'right', margin: '0px auto' };
  const styleRadioButtonCont = {};
  const styleRadioButton = { stroke: '#666', strokeWidth: '1px', strokeOpacity: '0.5' };
  return (
    <label className='radioButton' style={styleTop}>
      {!chkAtLeft && label ? (<div style={styleLabel}>{label}</div>) : ''}
      <div style={styleCheck} onMouseDown={onClick} >
        <svg width='20' height='20' style={styleRadioButtonCont} >
          <circle cx='10' cy='10' r='8' fill='transparent' style={styleRadioButton} />
          { checked ? <circle cx='10' cy='10' r='4' fill='#666' fillOpacity='0.9' /> : ''}
        </svg>
      </div>
      {chkAtLeft && label ? (<div onMouseDown={onClick} style={styleLabel}>{label}</div>) : ''}
    </label>
  );
};

RadioButton.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default RadioButton;
