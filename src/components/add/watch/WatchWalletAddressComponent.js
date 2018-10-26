import React from 'react';
import styled from 'styled-components';
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
  invalidChecksum: 'Invalid checksum',
  continue: 'Continue',
  back: 'Back'
};

const WarningBox = styled.div`
  background: #ffffcc;
  opacity: 0.75;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: brown;
  text-align: center;
`;

export const WatchWalletAddressComponent = (props) => {
  const { add, section, setup, onSubmit, onUpdate } = props;
  const { address, validation, network, networkId, testnet, name, rpc, api, selectedNetwork } = add[section];
  const { networksConfig } = setup;
  const menu = WatchMenu({ network, testnet, networksConfig });
  if (!menu) return false;
  const step = findWizardStep(menu, '/wallet');

  const onChange = value => (onUpdate({ network, networkId, testnet, address: value }));
  const onSend = () => (onSubmit({ network, networkId, testnet, address, name, rpc, api }));

  const canContinue = !!address && validation && validation.result && validation.result.valid;
  const invalidChecksum = validation && validation.result && (validation.result.checksum === false);
  const error = validation && validation.result && validation.result.error ? validation.result.error : false;
  return (
    <WizardPanel title={_t.walletAddress}>
      <Next to={menu[step + 1]} disabled={!canContinue} onClick={onSend} title={_t.continue}/>
      <Prev to={menu[step - 1]} title={_t.back}/>
      <div style={{ margin: '20px auto'}}>
        <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>
        <p style={{ textAlign: 'center', margin: 0 }}>{_t.pleaseProvide}</p>
        <TextInput {...{value: address, onChange, autofocus: true}} style={{ textAlign: 'center', fontSize: 12 }} />
        {error || invalidChecksum ? <WarningBox>{error || _t.invalidChecksum}</WarningBox> : false}
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
