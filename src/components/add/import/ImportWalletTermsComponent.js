import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { NetworkTermsComponent } from './../../network/NetworkTermsComponent';

const _t = {
  networkTerms: 'Accept Network Terms',
  accept: 'Accept',
  back: 'Back'
};

export const ImportWalletTermsComponent = ({ add, section }) => {

  const { network, testnet } = add[section];
  const menu = ImportMenu(network, testnet);
  const step = findWizardStep(menu, '/terms');

  return (
    <WizardPanel title={_t.networkTerms} wide={true}>
      <Next to={menu[step + 1]} title={_t.accept} />
      <Prev to={menu[step - 1]} title={_t.back} />
      <div style={{ margin: '50px auto'}}>
        <NetworkTermsComponent {...{network}} />
      </div>
      <Steps {...{ step, menu }} />
    </WizardPanel>
  );

};
