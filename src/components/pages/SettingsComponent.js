import React from 'react';
import styled from 'styled-components';
import Dropdown from './../controls/Dropdown';
import { WizardPanel, MyAssetsButton, MyWalletsButton } from './../panel/index';

const _t = {
  settings: 'Settings',
  security: 'Security',
  priceEstimate: 'Price Estimate',
  lockTimeout: 'Auto-Lock timeout',
  currencyForEstimate: 'Currency for Estimate',
  displayPriceDiff: 'Display Price Difference',
  hideBalances: 'Hide Balances Less Than',
  yes: 'Yes',
  no: 'No',
  noLock: 'No Lock',
  minute: 'min'
};

const minutes = [1, 5, 10, 15, 30];
const optionsTimeout = [ { value: 0, label: _t.noLock }].concat(
  minutes.map(value => ({ value, label: `${value} ${_t.minute}`}))
);

const currencies = [
  "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "ZAR"
];
const optionsCurrencies = currencies.map(curr => ({ value: curr, label: curr }));

const optionsYesNo = [
  { value: false, label: _t.yes },
  { value: true, label: _t.no }
];

const Header = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: #222;
  text-shadow: 2px 2px 10px #fff;
  text-align: center;
  background: #f5eff9;
  line-height: 50px;
  border: 1px #cfcfcb solid;
`;
const Row = styled.div`
  display: flex;
  line-height: 38px;
  .label { flex: 1; color: #8663f5; font-size: 14px; }
  margin-top: 2px;
  margin-bottom: 2px;
  padding-bottom: 2px;
`;

export class SettingsComponent extends React.Component {

  onKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.props.onEsc(false);
    }
  };

  componentWillMount() {
    window.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress);
  }
  render() {
    const { settings, onChange } = this.props;
    const { currency, timeout, priceDiff, minBalance } = settings;

    const optionsMinBalance = [
      { value: 0, label: `0 ${currency}` },
      { value: 0.1, label: `0.01 ${currency}` },
      { value: 0.5, label: `0.50 ${currency}` },
      { value: 1, label: `1 ${currency}` }
    ];

    return (
      <WizardPanel title={_t.settings}>
        <MyAssetsButton />
        <MyWalletsButton />
        <div style={{ marginTop: 10 }}>
          <Row>
            <div className='label'>{_t.lockTimeout}</div>
            <div><Dropdown options={optionsTimeout} value={timeout} onChange={v => (onChange('timeout', v))}/></div>
          </Row>

          <Header>{_t.priceEstimate}</Header>
          <Row>
            <div className='label'>{_t.currencyForEstimate}</div>
            <div><Dropdown options={optionsCurrencies} value={currency} onChange={v => (onChange('currency', v))}/></div>
          </Row>
          <Row>
            <div className='label'>{_t.displayPriceDiff}</div>
            <div><Dropdown options={optionsYesNo} value={priceDiff} onChange={v => (onChange('priceDiff', v))}/></div>
          </Row>
          <Row>
            <div className='label'>{_t.hideBalances}</div>
            <div><Dropdown options={optionsMinBalance} value={minBalance} onChange={v => (onChange('minBalance', v))}/></div>
          </Row>

        </div>
      </WizardPanel>
    );
  }
}
