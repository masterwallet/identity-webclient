import React from 'react';
import styled from 'styled-components';

const NetSwitchDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  button {
    width: 50%;
    background: transparent;
  }
  button:active, button:focus {
    outline: none !important;
    box-shadow: none;
  }
  button.active {
    background: linear-gradient(rgb(255, 255, 255) 0%, rgb(237, 231, 243) 80%) rgb(237, 231, 243);
    border-color: #007bff;
    border-top: 1px #6239bf solid;
    border-bottom: 1px #61c38b solid;
  }
`;

export class NetSwitcher extends React.Component {
  onKeyPress = (e) => {
    const { onChange } = this.props;
    if (e.keyCode === 77) { // 'm' was pressed
      onChange(false);
    } else if (e.keyCode === 84) { // 'm' was pressed
      onChange(true);
    }
  };

  componentWillMount() {
    window.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress);
  }
  render() {
    const { isTestNet, onChange } = this.props;
    return (
      <NetSwitchDiv>
        <button
          className={`btn btn-sm ${!isTestNet ? 'active': ''}`}
          onClick={()=> (onChange(false))}
        >
          Main Net
        </button>
        <button
          className={`btn btn-sm ${!!isTestNet ? 'active': ''}`}
          onClick={() => (onChange(true))}
        >
          Test Net
        </button>
      </NetSwitchDiv>
    );
  }
}
