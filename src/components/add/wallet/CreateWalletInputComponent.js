import React from 'react';
import { Redirect } from 'react-router-dom';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { JDentIcon } from './../../jdenticon/index';

const _t = {
  accountWasGenerated: 'Account was Generated',
  continue: 'Continue',
  generatedText: 'New wallet was generated and added to the watch list.',
  thisIsTheAddress: 'Here is public address of this wallet',
  itWillBeHelpful: 'It will be helpfull to check this image on transactions'
};

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const Address = ({ value }) => (
  <div style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center', display: 'flex', alignItems: 'center' }}>
    {value}
    &nbsp;
    <button className="btn btn-xs btn-success" style={{ padding: "2px 10px" }} onClick={() => (copyToClipboard(value))}>
      <img src="/media/copy.png" alt='Copy to Buffer' style={{ width: 'auto', height: 12 }} />
    </button>
  </div>
);

export const CreateWalletInputComponent = ({ section, add }) => {
  const { network, testnet } = add[section]
  const { lastResponse } = add;
  const menu = CreateMenu(network, testnet);
  const step = findWizardStep(menu, '/wallet')
  if (!lastResponse || !lastResponse.data || !lastResponse.data.address) {
    return <Redirect to={menu[step - 1]} />
  }
  const { address } = lastResponse.data;
  const canContinue = !!address;
  return (
    <WizardPanel title={_t.accountWasGenerated}>
      <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue} />

      <p style={{ textAlign: 'center' }}>{_t.generatedText}</p>
      <p style={{ textAlign: 'center' }}>{_t.thisIsTheAddress}</p>
      <Address value={address} />
      <div style={{ textAlign: 'center', background: 'white', width: 150, margin: '0px auto' }}>
        <JDentIcon size={150} value={address} />
      </div>
      <p style={{ textAlign: 'center' }}>{_t.itWillBeHelpful}</p>

      <Steps {...{ step, menu }} />
    </WizardPanel>
  );

};
