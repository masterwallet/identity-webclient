import React from 'react';

const Checkbox = ({ children, disabled = false, value, side = 'left', onChange }) => {
  const onClick = () => { onChange(!value); };
  const styleTop = { display: 'flex', alignItems: 'flex-start', cursor: 'pointer' };
  const styleLabel = { flex: 1, marginLeft: '5px', color: '#FFF', fontSize: 14 };
  const chkAtLeft = (!side || side === 'left');
  const styleCheck = { textAlign: chkAtLeft ? 'left' : 'right', margin: '0px auto'};
  const styleButton = { stroke: '#eee', strokeWidth: 1, strokeOpacity: '0.5' };
  if (disabled) { styleTop.cursor = "disabled"; }
  const fill = (disabled) ? '#888' : '#f8f8f8';
  return (
    <label>
      <div className='checkboxButton' style={styleTop}>
        {!chkAtLeft && children ? (<div style={styleLabel}>{children} &nbsp; </div>) : ''}
        <div style={styleCheck} onMouseDown={onClick}>
          <svg width='20' height='20'>
            <rect x='0' y='0' width='20' height='20' fill={fill} style={styleButton} />
            {value ? (
              <polygon fill='#000' points='7.6,11.6 4.4,8.4 2,10.8 7.6,16.4 18,6 15.6,3.6'></polygon>
            ) : false}
          </svg>
        </div>
        {chkAtLeft && children ? (<div onMouseDown={onClick} style={styleLabel}>&nbsp;{children}</div>) : ''}
      </div>
    </label>
  );
};

export default Checkbox;
