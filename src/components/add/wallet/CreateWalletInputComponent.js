import React from 'react';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next, Prev } from './../../panel/index';
import { JDentIcon } from './../../jdenticon/index';

const _t = {
  accountWasGenerated: 'Account was Generated',
  continue: 'Continue',
  generatedText: 'New wallet was generated and added to the watch list.',
  thisIsTheAddress: 'Here is public address of this wallet',
  itWillBeHelpful: 'It will be helpfull to check this image on transactions',
  back: 'Back'
};

const Address = ({ value }) => (
  <div style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center', display: 'flex', alignItems: 'center' }}>
    {value}
    &nbsp;
    <button className="btn btn-xs btn-success" style={{ padding: "2px 10px" }}>
      <img src="/media/copy.png" alt='Copy to Buffer' style={{ width: 'auto', height: 12 }} />
    </button>
  </div>
);

export class CreateWalletInputComponent extends React.Component {

  render() {
    // const { add } = this.props;
    const address = '0x1303494949494949494949949494940031233949';
    const { network } = this.props.match.params;
    const menu = CreateMenu(network);
    const step = findWizardStep(menu, '/wallet')
    return (
      <WizardPanel title={_t.accountWasGenerated}>
        <Next to={menu[step + 1]} title={_t.continue} />
        <Prev to={menu[step - 1]} title={_t.back} />
        
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
  }

}
