import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import { JDentIcon } from './../../jdenticon/index';

const _t = {
  accountWasGenerated: 'Account was Generated',
  continue: 'Continue',
  generatedText: 'New wallet was generated and added to the watch list.',
  thisIsTheAddress: 'Here is public address of this wallet',
  itWillBeHelpful: 'It will be helpfull to check this image on transactions' 
}

export class CreateWalletInputComponent extends React.Component {

  render() {
    // const { add } = this.props;
    const address = '0x1303494949494949494949949494940031233949';
    const { network } = this.props.match.params;
    return (
      <WizardPanel title={_t.accountWasGenerated}>
        <Next to={`/create/${network}/paper`} title={_t.continue} />
        <p style={{ textAlign: 'center' }}>{_t.generatedText}</p>
        <p style={{ textAlign: 'center' }}>{_t.thisIsTheAddress}</p>
        <div style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>
          {address}
        </div>        
        <div style={{ textAlign: 'center', background: 'white', width: 150, margin: '0px auto' }}>
          <JDentIcon size={150} value={address} />
        </div>
        <p style={{ textAlign: 'center' }}>{_t.itWillBeHelpful}</p>

        <Steps {...{ step: 2, menu: CreateMenu(network) }} />
      </WizardPanel>
    );
  }

}