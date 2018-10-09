import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Inp = styled.div`
  input {
    background: transparent;
    border: none;
    border-bottom: 1px #cececa solid;
    margin-bottom: 1px;
    border-radius: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  input:focus {
    background: transparent;
    outline: none;
    box-shadow: none;
    border-bottom: 2px #8893b8 solid;
    margin-bottom: 0px;
    font-weight: bold;
  }
  input.invalid {
    color: red;
    font-weight: bold;
    border-bottom: 2px red solid;
    margin-bottom: 0px;
  }
`;

class TextInput extends React.Component {

  isFocused = false;

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    autofocus: PropTypes.any
  };

  onFocus = () => {
    this.isFocused = true;
  };

  onBlur = () => {
    this.isFocused = false;
  };

  safeValue = () => {
    return this.props.value ? this.props.value : '';
  }
  componentDidMount() {
    this.input.value = this.safeValue();
    if (this.props.autofocus) {
      setTimeout(() => { if (this.input) this.input.focus(); }, 600);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      if (!this.isFocused) {
        this.input.value = this.safeValue();
      }
    }
  }

  handleKeyPress = (e) => {
    if (e.which === 13 && typeof this.props.onEnter === 'function') {
      this.props.onEnter();
    }
    if (e.which === 27 && typeof this.props.onEsc === 'function') {
      this.props.onEsc();
    }
  };

  render() {
    const onChange = e => (this.props.onChange(e.target.value));
    return (
      <Inp>
        <input
          id={this.props.id}
          maxLength={this.props.maxLength}
          spellCheck={false}
          ref={(input) => { this.input = input; }}
          onChange={onChange}
          onKeyPress={this.handleKeyPress}
          placeholder={this.props.placeholder}
          className={`form-control ${this.props.className ? this.props.className : ''}`}
          onFocus={this.onFocus} onBlur={this.onBlur}
          style={this.props.style}
          defaultValue={this.safeValue()}
          type={this.props.type ? this.props.type : 'text'}
          min={this.props.min}
          step={this.props.step}
        />
      </Inp>
    );
  }
}

export default TextInput;
