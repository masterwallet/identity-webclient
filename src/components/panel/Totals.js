import React from 'react';
import styled from 'styled-components';

const TotalsWrapper = styled.div`
  border-radius: 50%;
  margin: 0px auto;
  border-top: 2px solid #9b84f2;
  border-bottom: 2px solid #8894b8;
  height: 150px;
  width: 150px;
  position: relative;

  .amount { text-align: center; font-size: 26px; font-weight: bold; margin-top: 50px; }
  .currency { text-align: center; font-size: 16px; font-weight: normal; margin-top: 0px; color: #8760f6; }
`;

export const Totals = ({ value, currency = 'USD'} ) => {
  return (
    <TotalsWrapper>
      <div className="amount">{value}</div>
      <div className="currency">{currency}</div>
    </TotalsWrapper>
  );
};

