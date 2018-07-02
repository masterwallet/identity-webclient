import React from 'react';
import { Steps } from './../../controls/Steps';
import TextInput from './../../controls/TextInput';
import { WatchMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { JDentIcon } from './../../jdenticon/index';

const _t = {
  walletAddress: 'Wallet Address',
  pleaseProvide: 'please specify public address of the wallet',
  verifyTheImage: 'image for verification:',
  continue: 'Continue'
};

export class WatchWalletAddressComponent extends React.Component {
  state = { value: '' };

  onChange = (v) => {
    this.setState({ value: v })
  };

  render() {
    const { match } = this.props;
    const { network } = match.params;
    const menu = WatchMenu(network);
    const step = findWizardStep(menu, '/wallet');
    const { value } = this.state;
    return (
      <WizardPanel title={_t.walletAddress}>
        <Next to={menu[step + 1]} title={_t.continue}/>
        <div style={{ margin: '50px auto', textAlign: 'center' }}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.pleaseProvide}</p>
          <TextInput {...{value, onChange: this.onChange, autofocus: true}} />
          {value ? (
            <div style={{ textAlign: 'center', marginTop: 20}}>
              <p style={{ textAlign: 'center' }}>{_t.verifyTheImage}</p>
              <JDentIcon size={150} value={value} style={{ margin: '0px auto' }} />
            </div>
          ) : false}
        </div>

        <Steps {...{step, menu}} />
      </WizardPanel>
    );
  }
}
