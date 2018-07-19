import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { NetworkIcon } from './../../assets/NetworkIcon';
import { NetworkTermsComponent } from './../../network/NetworkTermsComponent';

const _t = {
  networkTerms: 'Accept Network Terms',
  accept: 'Accept',
  back: 'Back'
};

export const CreateWalletTermsComponent = ({ add, section }) => {
  const { network, testnet, selectedNetwork } = add[section];
  const menu = CreateMenu(network, testnet);
  const step = findWizardStep(menu, '/terms');

  return (
    <WizardPanel title={_t.networkTerms} wide={true}>
      <Next to={menu[step + 1]} title={_t.accept} />
      {menu[step - 1] ? <Prev to={menu[step - 1]} title={_t.back} /> : false}
      <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>
      <div style={{ margin: '10px auto'}}>
        <NetworkTermsComponent {...{network}} />
      </div>
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );
};
