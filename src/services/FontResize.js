import calculateSize from 'calculate-size';

export const calcFontSize = ({ text, maxWidth = 240 }) => {
  let options = {
    font: 'Roboto', 
    fontSize: '16px'
  };
  let currSize = calculateSize(text, options);
  let fontSize = 1;

  while (currSize.width >= maxWidth) {
    fontSize = (fontSize - 0.1).toFixed(1);
    options.fontSize = `${fontSize*16}px`;
    currSize = calculateSize(text, options);
  }
  return `${fontSize*16}px`;
};

export const calcSize = (text) => calculateSize(text, { font: 'Roboto', fontSize: '16px' });