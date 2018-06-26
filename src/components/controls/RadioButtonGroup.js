import React from 'react';
import { RadioButton } from './RadioButton';

class RadioButtonGroup extends React.Component {
  state = { checked: this.props.selected };

  onChange = (value) => {
    this.props.onChange(value);
    this.setState({ checked: value });
  };

  componentWillReceiveProps({ selected }) {
    if (selected && this.state.checked !== selected) {
      this.setState({ checked: selected });
    }
  }

  render() {
    const { style, options, isLabelDisabled } = this.props;
    return (
      <div style={style} >
        {options.map((option, index) => {
          const key = index;
          return (
            <RadioButton
              key={key}
              label={!isLabelDisabled ? option : ''}
              value={option}
              checked={this.state.checked === option}
              onChange={this.onChange}
            />
          );
        })}
      </div>
    );
  }
}

export default RadioButtonGroup;
