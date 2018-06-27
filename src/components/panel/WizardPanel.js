import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  h3 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;

    text-align: center;
    border-bottom: 1px #ba9ef4 solid;
    background: #e7e1f1;
    padding: 5px;
    box-shadow: 0px 2px 10px #d9cef0;
    font-size: 20px;
    color: #262329;
    line-height: 30px;
  }
  @media(max-width: 480px) {
    h3 { font-size: 16px; }
  }
  h6 {
      font-weight: bold;
  }
`;
const Spacer = styled.div`
  height: 50px;
`;

export const WizardPanel = ({ title, children, wide = false }) => (
    <Wrapper className="container-fluid">
      <h3>{title}</h3>
      <Spacer />
      <div style={{ width: (wide ? '80%' : 300), margin: '0px auto', textAlign: 'justify' }}>
        {children}
      </div>
    </Wrapper>
  );
