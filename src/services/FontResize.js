import calculateSize from 'calculate-size';

export const calcFontSize = ({ text, maxWidth, options }) => {
  options = options || {
    font: 'Roboto', 
    fontSize: '1rem'
  };
  let currSize = calculateSize(text, options);
  let fontSize = parseFloat(options.fontSize);

  while (currSize.width >= maxWidth) {
    fontSize = (fontSize - 0.1).toFixed(1);
    options.fontSize = `${fontSize}rem`;
    currSize = calculateSize(text, options);
  }
  return `${fontSize}rem`;
};

export const calcSize = (text, options) => calculateSize(text, options || { font: 'Roboto', fontSize: '1rem' });

export const getFontFamily = () => {
  const element = document.createElement('div');
  document.body.appendChild(element);
  const fontFamily = getComputedStyle(element).fontFamily;
  element.parentNode.removeChild(element);
  return fontFamily;
};