import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { ExchangeSelector } from './../../controls/ExchangeSelector';

const _t = {
  selectExchange: 'Select Exchange to Watch',
  continue: 'Continue',
  back: 'Back'
};

export const ExchangeSelectComponent = ({ add, section, onUpdateNetwork }) => {
  const { network } = add[section];
  const menu = ExchangeMenu(network);
  if (!menu) return false;
  const step = 0;
  return (
    <WizardPanel title={_t.selectExchange}>
      {network ? <Next to={menu[step + 1]} title={_t.continue} /> : false}
      <Prev to='/add' title={_t.back} />

      <ExchangeSelector value={network} onChange={onUpdateNetwork} />

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
