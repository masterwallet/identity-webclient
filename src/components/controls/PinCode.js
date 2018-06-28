import React from 'react';
import styled from 'styled-components';

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
`;

export class PinCode extends React.Component {
  state = {
    focused: 0
  };
  render() {
    const { length = 4, value, onChange } = this.props;
    const list = Array.apply(null, { length }).map(Function.call, Number);
    return (
      <PinWrapper>
        {list.map(n => (
          <div className="digit">&bull;</div>
        ))}
      </PinWrapper>
    );
  }
}

