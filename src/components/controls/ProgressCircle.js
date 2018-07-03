import React from 'react';
import styled from 'styled-components';

const CircleWrapper = styled.div`
  display: block;
  height: 200px;
  width: 200px;
  margin: 2em auto;
  box-shadow: 0 0 1em #61c38b;
  border-radius: 100%;
  position: relative;

  svg circle {
   stroke-dashoffset: 0;
   transition: stroke-dashoffset 0.3s linear;
   stroke: white;
   stroke-width: 1em;
  }
  :after {
    position: absolute;
    display: block;
    height: 160px;
    width: 160px;
    left: 50%;
    top: 50%;
    box-shadow: inset 0 0 1em #61c38b;
    content: attr(data-pct)"%";
    margin-top: -80px;
    margin-left: -80px;
    border-radius: 100%;
    line-height: 160px;
    font-size: 2em;
    color: #6239bf;
    text-shadow: 0 0 0.5em #61c38b;
  }

}
`;

export const ProgressCircle = ({ value, size = 200 }) => {
  const r = 90;
  const bounded = (value < 0) ? 0 : (value > 100 ? 100 : value);
  const pct = ((100-bounded)/100)*(Math.PI * r * 2);
  const styleCircle = {
    stroke: '#cececa',
    strokeDashoffset: pct
  };

  return (
    <CircleWrapper data-pct={value}>
      <svg width={size} height={size} viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0"></circle>
        <circle r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" style={styleCircle}></circle>
      </svg>
    </CircleWrapper>
  );
};
