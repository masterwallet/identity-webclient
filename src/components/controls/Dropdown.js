import React from 'react'; // eslint-disable-line
import styled from 'styled-components';

const SelectDiv = styled.div`
  select {
    background: transparent;
    border: none;
    border-bottom: 1px #cececa solid;
    margin-bottom: 1px;
    border-radius: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  select:focus {
    background: transparent;
    outline: none;
    box-shadow: none;
    border-bottom: 2px #8893b8 solid;
    margin-bottom: 0px;
    font-weight: bold;
  }
  select.invalid {
    color: red;
    font-weight: bold;
    border-bottom: 2px red solid;
    margin-bottom: 0px;
  }
`;

class Dropdown extends React.Component {
  componentDidMount() {
    this.input.value = this.props.value;
  }
  componentDidUpdate(prevProps) {
    // if (this.props.value !== prevProps.value) {
    this.input.value = this.props.value;
    // }
  }
  render() {
    const onChange = (e) => {
      if (this.props.field) this.props.onChange(this.props.field, e.target.value);
      else this.props.onChange(e.target.value);
    };
    const id = Math.random();
    const others = {};
    const options = [];

    if (this.props.disabled) others.disabled = true;
    if (this.props.options && this.props.options.length) {
      this.props.options.forEach((item) => {
        let value = '';
        let label = '';
        if (typeof item === 'object') {
          if (typeof item.value !== 'undefined') value = item.value;
          else value = item.label;

          label = item.label;
        } else {
          value = item;
          label = item;
        }
        options.push({ ...item, value, label });
      });
    } else if (this.props.end) {
      const start = this.props.start || 0;
      if (start < this.props.end) {
        for (let i = start; i <= this.props.end; i++) {
          let res = i;
          if (this.props.mask) {
            const length = this.props.mask.length;
            res = `${this.props.mask.substring(0, length - ('' + i).length)}${i}`;
          }
          options.push({ value: res, label: res });
        }
      } else {
        for (let i = start; i >= this.props.end; i--) {
          let res = i;
          if (this.props.mask) {
            const length = this.props.mask.length;
            res = `${this.props.mask.substring(0, length - ('' + i).length)}${i}`;
          }
          options.push({ value: res, label: res });
        }
      }
    }

    return (
      <SelectDiv className={this.props.containerClass || ''}>
        {this.props.label && (
          <label htmlFor={id}>{this.props.label}</label>
        )}
        <select
          id={id}
          ref={(input) => { this.input = input; }}
          onChange={onChange}
          className={`form-control ${this.props.className || ''}`}
          {...others}
          defaultValue=''
          style={{ textTransform: 'capitalize', ...this.props.style } || { textTransform: 'capitalize' }}
        >
          {options ? options.map((item, k) => (
            <option key={`${item.value}-${k}`} value={item.value} disabled={item.disabled} >{item.label}</option>
          )) : ''}
        </select>
      </SelectDiv>
    );
  }
}

export default Dropdown;
