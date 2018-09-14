import React from 'react';
import { Redirect } from 'react-router-dom';
import IFrame from 'react-iframe';
import { Steps } from './../../controls/Steps';
import { CreateMenu, findWizardStep } from './../../../config/Wizards';
import { WizardPanel, Next } from './../../panel/index';
import TextInput from './../../controls/TextInput';
import { fetchBlob } from './../../../services/ApiRequest';
import Debounced from './../../../services/Debounced';
import RadioButtonGroup from './../../controls/RadioButtonGroup';


const _t = {
  paperWallet: 'Print Paper Wallet',
  printInsecurePaperWallet: 'Here you can print insecure Paper Wallet:',
  printSecuredPaperWallet: 'Or you can print Paper Wallet, secured with password:',
  myAssets: 'My Wallets',
  printWallet: 'Print Wallet',
  yourPassword: 'Secret Wallet Password'
};

const section = 'create';
export class CreateWalletPaperComponent extends React.Component {
  state = { 
    value: '',
    frameDataUrl: '',
    mode: 'insecure',
    encrypting: false
  };

  componentDidMount = () => {
    this.loadFrame();
  };

  // componentWillUpdate = (nextProps, nextState) => {
  //   if (nextState.value !== this.state.value) {
  //       Debounced.start('reload-frame', () => {
  //         this.loadFrame();
  //       }, 10000);
  //   }
  // };

  onChange = (value) => {
    const valid = /^[\x00-\x7F]+$/.test(value);
    this.setState({ value, valid, frameDataUrl: '' });
  };

  onChangeMode = (mode) => {
    if (mode === 'insecure') {
      this.loadFrame();
    };
    this.setState({ mode, frameDataUrl: '' });
  };

  loadFrame = () => {
    const { add } = this.props;
    const password = this.state.value;
    if (
      add.lastResponse 
      && add.lastResponse.data 
      && add.lastResponse.data.id
    ) {
      this.setState({ encrypting: true, frameDataUrl: '' });
      const url = `/api/wallets/${add.lastResponse.data.id}/pdf?rotate=true`;
      const headers = new Headers();
      headers.append('BIP38-Passphrase', password);
      fetchBlob(url, { headers }).then(response => {
        const pdfUrl = URL.createObjectURL(response);
        console.log(pdfUrl);
        const innerFrameHtml = `
          <html>
            <body>
              <object data="${pdfUrl}" type="application/pdf">
                <embed
                  src="${pdfUrl}"
                  type="application/pdf"
                  style="height:750px;width300px;"
                />
              </object>
            </body>
          </html>`;
          
        const innerFrameBlob = new Blob([innerFrameBlob], { type: 'text/html' });
        const frameDataUrl = URL.createObjectURL(innerFrameBlob);
        this.setState({
          //frameDataUrl: URL.createObjectURL(response),
          frameDataUrl,
          innerFrameHtml,
          encrypting: false
        });
      });
    }
  }

  render() {
    //console.log(this.state);
    const { value, mode, encrypting, frameDataUrl, valid } = this.state;
    const { add, setup } = this.props;
    const { network, testnet } = add[section];
    const { networksConfig } = setup;
    const menu = CreateMenu({ network, testnet, networksConfig });
    if (!menu) return false;

    const step = findWizardStep(menu, '/paper')
    const { lastResponse } = add;
    if (!lastResponse || !lastResponse.data || !lastResponse.data.id) {
      return <Redirect to={menu[step - 1]} />
    }

    return (
      <WizardPanel title={_t.paperWallet}>
        <Next to={`/wallets`} title={_t.myAssets} />
        <div style={{ margin: '30px auto'}}>
          {/* <p style={{ textAlign: 'center', margin: 0 }}>{_t.printInsecurePaperWallet}</p>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.printSecuredPaperWallet}</p> */}
          <div>
            <RadioButtonGroup options={[
              { value: 'insecure', label: 'Insecure Paper Wallet' },
              { value: 'secure', label: 'Password Protected Paper Wallet' }
            ]} onChange={this.onChangeMode} value={mode} />
          </div>
          {mode === 'secure' ?
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 5 }}>
                  <TextInput 
                    value={value} 
                    onChange={this.onChange} 
                    placeholder={_t.yourPassword}
                    style={{ 
                      textAlign: 'center', 
                      float: 'left',
                      width: '88%'
                    }}
                  />
                  <button
                    className={`btn btn-xs btn-warning ${!valid ? 'disabled' : ''}`}
                    style={{ 
                      padding: "2px 10px",
                      float: 'right'
                    }} 
                    onClick={() => { 
                      if (value && valid) this.loadFrame();
                    }}
                  >
                    <img src={`/media/${encrypting ? 'loader365thumb.gif' : 'lock-solid.svg'}`} style={{ width: 'auto', height: 12 }} />
                  </button>
              </div>
            </div> : false
          }
          <div style={{ textAlign: 'center' }}>
            {/* <button className='btn btn-success'>{_t.printWallet}</button> */}
            {/* <IFrame
              url={frameDataUrl}
              //url='http://localhost:7773/api/wallets/81b98d95ea338af6c3a5928e4a9055ea58bbf26a/pdf?rotate=true'
              height="750px"
              width="300px"
              display="initial"
              position="relative"
            /> */}
            <iframe
              srcDoc={this.state.innerFrameHtml} 
              //src={frameDataUrl}
              height="750px"
              width="300px"
              display="initial"
              position="relative"
            >
            </iframe>
            
          </div>
        </div>
        {/* <div style={{ margin: '30px auto'}}>
          <p style={{ textAlign: 'center', margin: 0 }}>{_t.printSecuredPaperWallet}</p>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 5 }}>
                <TextInput value={value} onChange={this.onChange} placeholder={_t.yourPassword} style={{ textAlign: 'center' }}/>
            </div>
            <button className='btn btn-primary'>{_t.printWallet}</button>
          </div>
        </div> */}
        <hr />
        {/* <pre>{JSON.stringify({ lastResponse }, null, 2)}</pre> */}
        <Steps {...{ step, menu }} />
      </WizardPanel>
    )
  }
}
