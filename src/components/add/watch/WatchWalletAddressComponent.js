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
  return false;
};

export class WatchWalletAddressComponent extends React.Component {
  state = { address: '' };

  onChange = (v) => {
    this.setState({ address: v });
    // this.props.dispatch({ type: 'UPDATE_PUBLIC_KEY', value: v })
  };
  componentWillMount = () => {
    // const { add, section } = this.props;
    // const { publicKey } = add[section];
    // this.props.dispatch({ type: 'UPDATE_PUBLIC_KEY', value: publicKey })
  }

  render() {
    const { add, section } = this.props;
    const { network, testnet, selectedNetwork } = add[section];
    const menu = WatchMenu(network, testnet);
    const step = findWizardStep(menu, '/wallet');
    const { address } = this.state;

    const canContinue = !!address;
    return (
      <WizardPanel title={_t.walletAddress}>
        <Next to={menu[step + 1]} disabled={!canContinue} title={_t.continue}/>
        <Prev to={menu[step - 1]} title={_t.back}/>
        <div style={{ margin: '20px auto'}}>
          <NetworkIcon {...selectedNetwork} title={network}  style={{ margin: 20 }}/>

          <p style={{ textAlign: 'center', margin: 0 }}>{_t.pleaseProvide}</p>
          <TextInput {...{value: address, onChange: this.onChange, autofocus: true}} />
          {selectedNetwork.EIP55 ? <Eip55 address={address}/> : false}
          {address ? (
            <div style={{ textAlign: 'center', marginTop: 20}}>
              <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.verifyTheImage}</p>
              <JDentIcon size={150} value={address} style={{ margin: '0px auto', background: 'white' }} />
            </div>
          ) : false}
        </div>

        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  }
}
