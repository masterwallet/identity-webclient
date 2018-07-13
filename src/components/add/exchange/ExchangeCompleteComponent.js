import React from 'react';
import { Steps } from './../../controls/Steps';
import { ExchangeMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { NetworkIcon } from './../../assets/NetworkIcon';

const _t = {
  success: 'Exchange Account Was Added',
  accountWasAdded: 'Access to exchange account was verified and added to the wallet for monitoring.',
  myAssets: 'My Wallets',
  back: 'Back'
};

export const ExchangeCompleteComponent = ({ add, section }) => {
  const { network, selectedNetwork } = add[section]; 
  const menu = ExchangeMenu(network);
  const step = findWizardStep(menu, '/complete');

  return (
    <WizardPanel title={_t.success}>
      <Next to={`/wallets`} title={_t.myAssets} />
      <Prev to={menu[step - 1]} title={_t.back} />

      <NetworkIcon {...selectedNetwork} title={network} style={{ margin: 20 }}/>

      <p style={{ textAlign: 'center', marginTop: 20 }}>{_t.accountWasAdded}</p>
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );

};