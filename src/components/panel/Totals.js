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

const SpinnerSvg = styled.svg`
  animation-name: spin;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;

  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

const Spinner = () => (
  <SpinnerSvg 
    style={{ 
      width: 130,
      height: 130,
      position: 'absolute',
      top: -3,
      left: -1,
      opacity: 0.2
    }}
    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
  >
    <path fill="currentColor" d="M460.115 373.846l-6.941-4.008c-5.546-3.202-7.564-10.177-4.661-15.886 32.971-64.838 31.167-142.731-5.415-205.954-36.504-63.356-103.118-103.876-175.8-107.701C260.952 39.963 256 34.676 256 28.321v-8.012c0-6.904 5.808-12.337 12.703-11.982 83.552 4.306 160.157 50.861 202.106 123.67 42.069 72.703 44.083 162.322 6.034 236.838-3.14 6.149-10.75 8.462-16.728 5.011z" >
    </path>
  </SpinnerSvg>
);

const fontFamily = getFontFamily();

export const Totals = ({ value, currency = 'USD', loading, children} ) => {
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
       }} className="amount">
       {formatAssetValue(value)}
      </div>
      {loading ? <Spinner /> : false}
      <div className="currency">{currency}</div>
    </TotalsWrapper>
  );
};

