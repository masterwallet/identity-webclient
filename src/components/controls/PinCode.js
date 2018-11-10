import React from 'react';
import styled from 'styled-components';
import { Numpad } from './Numpad';

const PinWrapper = styled.div`
  display: flex;
  margin: 30px auto;
  justify-content: center;
  .digit {
     border: 1px #cececa solid;
     border-bottom: 1px #eff5d3 solid;
     width: 40px;
     height: 40px;
     box-shadow: 2px 2px 10px #f2f3eb;
     background: #f5eff9;
     text-align: center;
     line-height: 36px;

     font-weight: bold;
     font-size: 20px;
     margin-left: 2px;
     margin-right: 2px;
  }
  .digit.focused {
    box-shadow: 0px 0px 14px #61c38b;
    border-color: rgb(134, 98, 252);
    background: white;
  }
  &.invalid .digit {
    border: 1px red solid !important;
    background: #fff0f0;
  }
`;

export class PinCode extends React.Component {
  state = {
    focused: 0
  };
  onKeyPress = (e) => {
    const { length = 6, value, onChange, onComplete } = this.props;
    if (e.keyCode === 8 && this.state.focused > 0) {
      const focused = this.state.focused - 1;
      onChange(value.substring(0, value.length - 1));
      this.setState({ focused });
    }
    if (e.keyCode === 27 || e.keyCode === 13 || e.keyCode === 32) {
      onChange('');
      this.setState({ focused: 0 });
    }
    if (e.keyCode >= 48 && e.keyCode <= 59) {
      const digit = e.keyCode - 48;
      if (value.length < length) {
        onChange(value + '' + digit);
        this.setState({ focused: value.length + 1 });
        // Triggering that we've managed to finish
        if (value.length + 1 === length && typeof onComplete === 'function') {
          onComplete(value + '' + digit);
        }
      }
    }
  }
  componentWillMount() {
    window.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({ focused: nextProps.value.length });
    }
  }
  render() {
    const { length = 6, error, value, onChange, onComplete } = this.props;
    const { focused } = this.state;
    const list = Array.apply(null, { length }).map(Function.call, Number);
    return (
      <div>
        <PinWrapper title={value} className={error ? 'invalid': ''}>
          {list.map(n => {
            const className = `digit ${(focused) === n ? 'focused' : ''}`;
            const v = (value && n < value.length) ? <span>&bull;</span> : '';
            return (
              <div key={n} className={className}>{v}</div>
            );
          })}
        </PinWrapper>
        <Numpad 
          onInput={(digit) => {
            if (value.length < length) {
              onChange(value + '' + digit);
              this.setState({ focused: value.length + 1 });
              // Triggering that we've managed to finish
              if (value.length + 1 === length && typeof onComplete === 'function') {
                onComplete(value + '' + digit);
              }
            }}
          }
          onBackspace={() => {
            console.log(value);
            const focused = this.state.focused - 1;
            onChange(value.substring(0, value.length - 1));
            this.setState({ focused });
          }}
        />
      </div>
    );
  }
}

