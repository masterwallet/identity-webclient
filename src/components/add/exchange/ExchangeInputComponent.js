import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu, findWizardStep } from './../../../config/Wizards';
import { Exchanges } from './../../../config/Exchanges';
import { WizardPanel, Next, Prev } from './../../panel/index';
import TextInput from './../../controls/TextInput';
import { NetworkIcon } from './../../assets/NetworkIcon';

const _t = {
  enterYourKeys: 'Please Enter API Keys',
  checkKeys: 'Check Keys',
  back: 'Back'
};

export const ExchangeInputComponent = ({ add, section, onUpdateKey }) => {
  const { network, selectedNetwork, secret } = add[section];
  const menu = ExchangeMenu(network);
  const step = findWizardStep(menu, '/account');
  const exchangeConfig = Exchanges.filter(x => (x.value === network))[0];

  const keys = exchangeConfig.keys.map(item => (item.id));
  const missingValues = keys.filter(key =>!secret[key]);
  const canContinue = missingValues.length === 0;

  return (
    <WizardPanel title={_t.enterYourKeys}>
      <Next to={menu[step + 1]} title={_t.checkKeys} disabled={!canContinue} />
      <Prev to={menu[step - 1]} title={_t.back} />

      <div style={{ margin: '20px auto'}}>
        <NetworkIcon {...selectedNetwork} title={network} style={{ margin: 20 }}/>
        {exchangeConfig.keys.map(item => (
          <div key={item.id}>
            {item.label}:
            <br />
            <TextInput {...{value: secret[item.id] || '', onChange: (v => (onUpdateKey(item.id, v))) }} />
          </div>
        ))}
      </div>

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
}
