import React from 'react';
import { render } from 'react-dom';
import sha1 from './sha1';
import SvgRenderer from './svgRenderer';
import SvgWriter from './svgWriter';
import iconGenerator from './iconGenerator';

const getCurrentConfig = () => {
  const configObject = {},
    lightnessConfig = configObject.lightness || {},
    saturation = configObject.saturation || 0.5;
  /**
   * Creates a lightness range.
   */
  const lightness = (configName, defaultMin, defaultMax) => {
    const range = lightnessConfig[configName] instanceof Array ? lightnessConfig[configName] : [defaultMin, defaultMax];
    /**
     * Gets a lightness relative the specified value in the specified lightness range.
     */
    return (value) => {
      value = range[0] + value * (range[1] - range[0]);
      return value < 0 ? 0 : value > 1 ? 1 : value;
    };
  };

  return {
    saturation: typeof saturation === "number" ? saturation : 0.5,
    colorLightness: lightness("color", 0.4, 0.8),
    grayscaleLightness: lightness("grayscale", 0.3, 0.9)
  };
};

/**
 * Inputs a value that might be a valid hash string for Jdenticon and returns it
 * if it is determined valid, otherwise a falsy value is returned.
 */
const getValidHash = (hashCandidate) => {
  return /^[0-9a-f]{11,}$/i.test(hashCandidate) && hashCandidate;
};

/**
 * Computes a hash for the specified value. Currnently SHA1 is used. This function
 * always returns a valid hash.
 */
const computeHash = (value) => {
  return sha1(!value ? "" : "" + value);
};

const toSvg = (value, size, padding) => {
  const writer = new SvgWriter(size);
  const renderer = new SvgRenderer(writer);
  iconGenerator(renderer,
    getValidHash(value) || computeHash(value),
    0, 0, size, padding, getCurrentConfig());
  return writer.toString();
};

export class JDentIcon extends React.Component {
  root = null;

  componentDidMount() {
    const { size, value, padding = 0 } = this.props;
    const div = document.createElement('div');
    div.innerHTML = toSvg(value, size, padding);
    this.root.appendChild(div);
  }

  render() {
    const { size, style } = this.props;
    return (
      <div ref={c => {this.root = c;}} style={{ ...style, width: size, height: size }}></div>
    );
  }
}
;
