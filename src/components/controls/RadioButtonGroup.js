import React from 'react';
import { RadioButton } from './RadioButton';

class RadioButtonGroup extends React.Component {

  onChange = (value) => {
    this.props.onChange(value);
  };

  onKeyPress = (e) => {
    switch (e.keyCode) {
      case 38: { // key up
        this.select(-1);
        break;
      }
      case 40: { // key down
        this.select(1);
        break;
      }
      case 36:
      case 33: {
        this.selectFirst();
        break;
      }
      case 34:
      case 35: {
        this.selectLast();
        break;
      }
      default:
        // console.log('keyCode=', e.keyCode);
    }
  };

  currentIndex = () => (this.props.options.findIndex(n => n.value === this.props.value));
  selectIndex = newIndex => (this.props.onChange(this.props.options[newIndex].value));
  isValidIndex = index => this.props.options[index] && !this.props.options[index].disabled;
  isFullyDisabled = () => (this.props.options.filter(n => !n.disabled).length === 0);

  select = (offset) => {
    if (this.isFullyDisabled()) return;

    // offset has to be either -1 or 1
    const len = this.props.options.length;
    let nextIndex = this.currentIndex();
    do {
      nextIndex += offset;
      if (nextIndex < 0) nextIndex += len;
      else if (nextIndex >= len) nextIndex = nextIndex % len;
    } while (!this.isValidIndex(nextIndex)); // skipping all disabled

    this.selectIndex(nextIndex);
  };

  selectFirst = () => {
    if (this.isFullyDisabled()) return;

    const len = this.props.options.length;
    let nextIndex = -1;
    do {
      nextIndex ++;
      if (nextIndex < 0) nextIndex += len;
      else if (nextIndex >= len) nextIndex = nextIndex % len;
    } while (!this.isValidIndex(nextIndex)); // skipping all disabled
    this.selectIndex(nextIndex);
  };

  selectLast = () => {
    if (this.isFullyDisabled()) return;

    const len = this.props.options.length;
    let nextIndex = len;
    do {
      nextIndex --;
      if (nextIndex < 0) nextIndex += len;
      else if (nextIndex >= len) nextIndex = nextIndex % len;
    } while (!this.isValidIndex(nextIndex)); // skipping all disabled
    this.selectIndex(nextIndex);
  };

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress);
  }

  render() {
    const { style, options } = this.props;
    return (
      <div style={style} >
        {options.map((option, index) => (
          <RadioButton
            key={index}
            {...option}
            checked={this.props.value === option.value}
            onChange={this.onChange}
          />
        ))}
      </div>
    );
  }
}

export default RadioButtonGroup;
