import calculateSize from 'calculate-size';

export const calcFontSize = ({ text, maxWidth = 240 }) => {
  let options = {
    font: 'Roboto', 
    fontSize: '1rem'
  };
  let currSize = calculateSize(text, options);
  let fontSize = 1;

  while (currSize.width >= maxWidth) {
    fontSize = (fontSize - 0.1).toFixed(1);
    options.fontSize = `${fontSize}rem`;
    currSize = calculateSize(text, options);
  }
  return `${fontSize}rem`;
};