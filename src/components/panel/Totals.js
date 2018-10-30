import React from 'react';
import styled from 'styled-components';
import { calcFontSize, getFontFamily } from './../../services/FontResize';
import { formatAssetValue } from './../../services/Utils';

const TotalsWrapper = styled.div`
  border-radius: 50%;
  margin: 0px auto;
  border-top: 3px solid #9b84f2;
  border-bottom: 3px solid #8894b8;
  border-left: 1px solid #9f98e2;
  border-right: 1px solid #9f98e2;
  background: #ece8f4;
  box-shadow: 0px 0px 30px #cebdf1;
  height: 130px;
  width: 130px;
  position: relative;

  .amount { text-align: center; font-weight: bold; margin-top: 30px; }
  .currency { text-align: center; font-size: 16px; font-weight: bold; margin-top: 0px; color: #65869d; text-shadow: 0px 0px 20px #fff; }
`;

const fontFamily = getFontFamily();

export const Totals = ({ value, currency = 'USD', children} ) => {
  return (
    <TotalsWrapper>
      {children}
      <div style={{ 
        fontSize: calcFontSize({ 
          text: formatAssetValue(value),
          maxWidth: 120, 
          options: { 
            font: fontFamily,
            fontSize: '2rem' 
          } 
        })
       }} className="amount">{formatAssetValue(value)}</div>
      <div className="currency">{currency}</div>
    </TotalsWrapper>
  );
};

