import React from 'react';
import { RadioButton } from './RadioButton';

class RadioButtonGroup extends React.Component {
  state = { checked: this.props.value };

  onChange = (value) => {
    this.props.onChange(value);
    this.setState({ checked: value });
  };

  componentWillReceiveProps({ value }) {
    if (value && this.state.checked !== value) {
      this.setState({ checked: value });
    }
  }

  render() {
    const { style, options } = this.props;
    return (
      <div style={style} >
        {options.map((option, index) => (
          <RadioButton
            key={index}
            {...option}
            checked={this.state.checked === option.value}
            onChange={this.onChange}
          />
        ))}
      </div>
    );
  }
}

export default RadioButtonGroup;
