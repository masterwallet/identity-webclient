import React from 'react';
import { Redirect } from 'react-router-dom';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { JDentIcon } from './../../jdenticon/index';
import { Address } from './../../controls/Address';

const _t = {
  accountWasGenerated: 'Wallet was Generated',
  continue: 'Continue',
  generatedText: 'New wallet was generated and added to the watch list.',
  thisIsTheAddress: 'Here is public address of this wallet',
  thisIsThePublicKey: 'Here is your public key for this wallet',
  itWillBeHelpful: 'It will be helpfull to check this image on transactions'
};

export const CreateWalletInputComponent = ({ section, add }) => {
  const { network, testnet } = add[section]
  const { lastResponse } = add;
  const menu = CreateMenu(network, testnet);
  const step = findWizardStep(menu, '/wallet')
  if (!lastResponse || !lastResponse.data || !lastResponse.data.id) {
    return <Redirect to={menu[step - 1]} />
  }
  const { address, publicKey } = lastResponse.data;
  const canContinue = !!address || !!publicKey;
  return (
    <WizardPanel title={_t.accountWasGenerated}>
      <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />

      <p style={{ textAlign: 'center' }}>{_t.generatedText}</p>
      <p style={{ textAlign: 'center' }}>{address ? _t.thisIsTheAddress : _t.thisIsThePublicKey}</p>
      <Address value={address || publicKey} />
      <div style={{ textAlign: 'center', background: 'white', width: 150, margin: '0px auto' }}>
        <JDentIcon size={150} value={address || publicKey} />
      </div>
      <p style={{ textAlign: 'center' }}>{_t.itWillBeHelpful}</p>

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );

};
