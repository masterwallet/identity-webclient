import React from 'react';
import styled from 'styled-components';

const NumPanel = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const NumButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 33.3333%;
  width: 100px;
  height: 50px;
  font-weight: bold;
  
  background-color: #cbb6f5;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, .25);

  &:active:hover {
    background-color: #e6dff3;
  }
  &:nth-of-type(10) {
		flex-basis: 66.6667%;
	}
`;

const Backspace = () => (
  <svg style={{ height: '1rem' }} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" >
    <path fill="currentColor" d="M576 64H205.26A63.97 63.97 0 0 0 160 82.75L9.37 233.37c-12.5 12.5-12.5 32.76 0 45.25L160 429.25c12 12 28.28 18.75 45.25 18.75H576c35.35 0 64-28.65 64-64V128c0-35.35-28.65-64-64-64zm-84.69 254.06c6.25 6.25 6.25 16.38 0 22.63l-22.62 22.62c-6.25 6.25-16.38 6.25-22.63 0L384 301.25l-62.06 62.06c-6.25 6.25-16.38 6.25-22.63 0l-22.62-22.62c-6.25-6.25-6.25-16.38 0-22.63L338.75 256l-62.06-62.06c-6.25-6.25-6.25-16.38 0-22.63l22.62-22.62c6.25-6.25 16.38-6.25 22.63 0L384 210.75l62.06-62.06c6.25-6.25 16.38-6.25 22.63 0l22.62 22.62c6.25 6.25 6.25 16.38 0 22.63L429.25 256l62.06 62.06z">
    </path>
  </svg>
);
  

export const Numpad = ({ onInput, onBackspace }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <NumPanel>
      {numbers.map(n => 
        <NumButton
          key={n} 
          onMouseDown={() => onInput(n)}
        >{n}
        </NumButton>
      )}
      <NumButton onMouseDown={onBackspace}><Backspace /></NumButton>
    </NumPanel>
  );
};