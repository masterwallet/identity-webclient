import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Inp = styled.div`
  textarea {
    background: transparent;
    border: none;
    border-bottom: 1px #cececa solid;
    margin-bottom: 1px;
    border-radius: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  textarea:focus {
    background: transparent;
    outline: none;
    box-shadow: none;
    border-bottom: 2px #8893b8 solid;
    margin-bottom: 0px;
    font-weight: bold;
  }
  textarea.invalid {
    color: red;
    font-weight: bold;
    border-bottom: 2px red solid;
    margin-bottom: 0px;
  }
`;

class TextArea extends React.Component {
  onFocus = () => {
    this.isFocused = true;
  };
  onBlur = () => {
    this.isFocused = false;
  };
  componentDidMount() {
    this.textarea.value = this.props.value;
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      if (!this.isFocused) {
        this.textarea.value = this.props.value;
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
    const safeValue = typeof this.props.value !== 'undefined' ? this.props.value : '';
    return (
      <Inp>
        <textarea
          id={this.props.id}
          maxLength={this.props.maxLength}
          ref={(textarea) => { this.textarea = textarea; }}
          rows={this.props.rows}
          onChange={onChange}
          onKeyPress={this.handleKeyPress}
          placeholder={this.props.placeholder}
          className={`form-control ${this.props.className ? this.props.className : ''}`}
          onFocus={this.onFocus} onBlur={this.onBlur}
          style={this.props.style}
          defaultValue={safeValue}
        />
      </Inp>
    );
  }
}

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default TextArea;
