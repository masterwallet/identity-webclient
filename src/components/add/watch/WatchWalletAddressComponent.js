import React from 'react';
import { Steps } from './../../controls/Steps';
import TextInput from './../../controls/TextInput';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { JDentIcon } from './../../jdenticon/index';

const _t = {
  walletAddress: 'Wallet Address',
  pleaseProvide: 'please specify public address of the wallet',
  verifyTheImage: 'image for verification:',
  continue: 'Continue',
  back: 'Back'
};


const section = 'watch';
export class WatchWalletAddressComponent extends React.Component {
  state = { value: '' };

  onChange = (v) => {
    this.setState({ value: v })
  };

  render() {
    const { add } = this.props;
    const { network, testnet } = add[section];
    const menu = WatchMenu(network, testnet);
    const step = findWizardStep(menu, '/wallet');
    const { value } = this.state;
    return (
      <WizardPanel title={_t.walletAddress}>
        <Next to={menu[step + 1]} title={_t.continue}/>
        <Prev to={menu[step - 1]} title={_t.back}/>
        <div style={{ margin: '50px auto', textAlign: 'center' }}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.pleaseProvide}</p>
          <TextInput {...{value, onChange: this.onChange, autofocus: true}} />
          {value ? (
            <div style={{ textAlign: 'center', marginTop: 20}}>
              <p style={{ textAlign: 'center', marginBottom: 0 }}>{_t.verifyTheImage}</p>
              <JDentIcon size={150} value={value} style={{ margin: '0px auto', background: 'white' }} />
            </div>
          ) : false}
        </div>

        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  }
}
