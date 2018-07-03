import React from 'react';
import styled from 'styled-components';

const TotalsWrapper = styled.div`
  border-radius: 50%;
  margin: 0px auto;
  border-top: 3px solid #9b84f2;
  border-bottom: 3px solid #8894b8;
  border-left: 2px solid #9f98e2;
  border-right: 2px solid #9f98e2;
  background: #ece8f4;
  box-shadow: 0px 0px 30px #cebdf1;
  height: 130px;
  width: 130px;
  position: relative;

  .amount { text-align: center; font-size: 26px; font-weight: bold; margin-top: 30px; }
  .currency { text-align: center; font-size: 16px; font-weight: bold; margin-top: 0px; color: #65869d; text-shadow: 0px 0px 20px #fff; }
`;

export const Totals = ({ value, currency = 'USD', children} ) => {
  return (
    <TotalsWrapper>
      {children}
      <div className="amount">{value}</div>
      <div className="currency">{currency}</div>
    </TotalsWrapper>
  );
};

