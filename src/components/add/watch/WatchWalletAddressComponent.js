import React from 'react';
import { Steps } from './../../controls/Steps';
import TextInput from './../../controls/TextInput';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { JDentIcon } from './../../jdenticon/index';
import { NetworkIcon } from './../../assets/NetworkIcon';

const _t = {
  walletAddress: 'Wallet Address',
  pleaseProvide: 'please specify public address of the wallet',
  verifyTheImage: 'image for verification:',
  continue: 'Continue',
  back: 'Back'
};

const Eip55 = ({ address }) => {
  if (!address) return false;
  return false;
  //
  //const a = address.toLowerCase().replace(/^0x/, '');
  //const hash = sha3(a).toString('hex');
  //let ret = '0x';
  //for (let i = 0; i < a.length; i++) {
  //  if (parseInt(hash[i], 16) >= 8) {
  //    ret += a[i].toUpperCase();
  //  } else {
  //    ret += a[i];
  //  }
  //}
  //if (a === ret) return false;
  // return (<div>ADDRESS CHECKSUM IS NOT MATCHING</div>);
};

export const WatchWalletAddressComponent = (props) => {
  const { add, section, onSubmit, onUpdate } = props;
  const { address, validation, network, networkId, testnet, selectedNetwork } = add[section];
  const menu = WatchMenu(network, testnet);
  const step = findWizardStep(menu, '/wallet');
  
  const onChange = value => (onUpdate({ network, networkId, testnet, address: value }));

  const canContinue = !!address && validation && validation.result && validation.result.valid;
  return (
    <WizardPanel title={_t.walletAddress}>
      <Next to={menu[step + 1]} disabled={!canContinue} onSubmit={onSubmit} title={_t.continue}/>
      <Prev to={menu[step - 1]} title={_t.back}/>
      <div style={{ margin: '20px auto'}}>
        <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>
        <p style={{ textAlign: 'center', margin: 0 }}>{_t.pleaseProvide}</p>
        <TextInput {...{value: address, onChange, autofocus: true}} style={{ textAlign: 'center' }} />
        <pre>{JSON.stringify(validation, null, 2)}</pre>
        {selectedNetwork.EIP55 ? <Eip55 address={address}/> : false}
        {address ? (
          <div style={{ textAlign: 'center', marginTop: 20}}>
            <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.verifyTheImage}</p>
            <JDentIcon size={150} value={address.trim().toLowerCase()} style={{ margin: '0px auto', background: 'white' }} />
          </div>
        ) : false}
      </div>
      <Steps {...{step, menu}} />
    </WizardPanel>
  );
};
