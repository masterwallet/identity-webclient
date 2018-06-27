import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
`;
const Step = styled.span`
  font-size: 32px;
  font-family: verdana;
`;

const shadow = { textShadow: '0px 0px 2px #333' };
const PreviousStep = () => <Step style={{ color: '#888', ...shadow }}>&bull;</Step>;
const NextStep = () => <Step style={{ color: '#ccc', ...shadow }}>&bull;</Step>;
const CurrentStep = () => <Step style={{ color: '#8662fc', ...shadow }}>&bull;</Step>;

export const Steps = ({ step, total, menu }) => {
  const list = Array.apply(null, { length: menu.length }).map(Function.call, Number);
  const title = `Step ${step+1} of ${total}`;
  return (
    <Wrapper title={title}>
      {list.map(n => {
        if (n === step) return <CurrentStep key={n} />
        else if (n < step) return <PreviousStep key={n} />
        else return <NextStep key={n} />
      })}
    </Wrapper>
  );
};

