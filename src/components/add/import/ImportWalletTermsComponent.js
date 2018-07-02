import React from 'react';
import { Steps } from './../../controls/Steps';
import { ImportMenu } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';

const _t = {
  networkTerms: 'Accept Network Terms',
  accept: 'Accept'
};

export class ImportWalletTermsComponent extends React.Component {

  render() {
    const { network } = this.props.match.params;
    const menu = ImportMenu(network);
    const step = 2;
    return (
      <WizardPanel title={_t.networkTerms} wide={true}>
        <Next to={menu[step + 1]} title={_t.accept} />
        <div style={{ margin: '50px auto'}}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum dolor felis, quis feugiat libero luctus vitae. Phasellus non dolor eu nisi venenatis imperdiet quis sagittis ante. Donec eleifend lacus non fermentum dignissim. Praesent mollis aliquam mauris, nec aliquet justo accumsan imperdiet. Integer tincidunt, arcu in tincidunt condimentum, orci sem elementum tortor, ut ornare nulla justo eget ligula. Pellentesque rutrum vulputate magna sed imperdiet. Nullam egestas dictum magna sit amet placerat. Vestibulum rutrum rutrum sapien at eleifend. Nam fermentum viverra nisl rutrum tristique. Cras tristique aliquam feugiat. Donec sed pulvinar mauris, id rhoncus dolor. Pellentesque nec egestas sapien. Nunc rhoncus nulla mauris. Pellentesque vel nisi turpis.
          </p>
          <p>
            Donec consectetur neque sit amet aliquet dignissim. Proin metus ligula, semper sit amet metus nec, porttitor ultricies metus. Vivamus nec diam posuere, laoreet sem ut, dignissim nisi. Nam aliquet orci in nunc ultrices sodales. Vestibulum mi libero, blandit id dolor sed, volutpat volutpat odio. Vivamus vehicula felis eget urna blandit consectetur. In condimentum diam scelerisque cursus auctor.
          </p>
          <p>
            Nullam pellentesque sodales varius. Integer non maximus dui. Donec pellentesque lectus accumsan euismod sagittis. Aliquam eget sollicitudin turpis. Praesent ornare tempus risus a fermentum. Sed cursus nunc justo, sit amet suscipit libero sagittis ac. Sed ultrices et arcu in auctor. Fusce mattis purus eget purus ultricies suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
        </div>
        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}
