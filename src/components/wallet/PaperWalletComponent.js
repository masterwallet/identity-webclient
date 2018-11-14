import React from 'react';
import IFrame from 'react-iframe';
import TextInput from './../controls/TextInput';
import RadioButtonGroup from './../controls/RadioButtonGroup';
import { isElectron, fetchBlob } from './../../services/ApiRequest';
import Passphrase from './../controls/Passphrase';
import { isASCII } from './../../services/Utils';

const _t = {
  printWallet: 'Print Wallet',
  labelInsecure: 'Insecure Paper Wallet',
  labelSecure: 'Password Protected Paper Wallet',
  yourPassword: 'Secret Wallet Password',
  enterPassphrase: 'Please enter passphrase to decode Private Key:'
};

const Ready = ({ size }) => (
  <svg style={size} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z">
    </path>
  </svg>
);

const isMobile = () => navigator && navigator.userAgent && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default class PaperWalletComponent extends React.Component {

  state = {
    ready: false,
    passphrase: '',
    password: '',
    mode: 'insecure',
    pdfUrl: '',
    encrypting: false,
    downloading: false
  };

  componentWillMount = () => {
    const secure = this.props.secure === 'true';
    if (!secure) {
      this.setState({ mode: 'insecure', valid: true }, () => { this.loadFrame() });
    } else {
      this.setState({ mode: 'secure', valid: false });
    }
  };

  onChange = (password) => {
    const valid = isASCII(password);
    this.setState({ password, valid, pdfUrl: '' });
  };

  onChangeMode = (mode) => {
    this.setState({ mode, pdfUrl: '', downloading: false, password: '' }, () => {
      if (mode === 'insecure') {
        this.loadFrame();
      };
    });
  };

  onChangePassphrase = (passphrase) => {
    const valid = isASCII(passphrase);
    this.setState({ valid, passphrase });
  };

  onChangeReady = (ready) => {
    if (ready === true) {
      this.setState({ ready: !ready, pdfUrl: '', downloading: false, password: '' });
    } else {
      this.setState({ ready: !ready }, () => {
        this.loadFrame();
      });
    }
  };

  loadFrame = async () => {
    const { walletId } = this.props;
    const { ready, password, passphrase, mode } = this.state;
    if (walletId && passphrase && ready 
      && ((mode === 'secure' && password) || mode === 'insecure')
    ) {
      this.setState({ encrypting: true, pdfUrl: '' });
      const url = `/api/wallets/${walletId}/pdf?rotate=true`;
      const headers = new Headers();
      if (password) {
        headers.append('BIP38-Passphrase', password);
      }
      headers.append('Passphrase', passphrase);
      
      const response = await fetchBlob(url, { headers });
      const pdfUrl = URL.createObjectURL(response);
      this.setState({
        pdfUrl,
        encrypting: false
      });
    }
  };

  render() {
    const { bip38 } = this.props;
    const { ready, passphrase, password, mode, encrypting, pdfUrl, valid, downloading } = this.state;
    
    const iframe = (
      <IFrame
        url={pdfUrl}
        //url='http://localhost:7773/api/wallets/a07cfff2e86f9b81f68f4d13222608dc9e17baf2/pdf?rotate=true'
        height="750px"
        width="300px"
        display="initial"
        position="relative"
      />
    );
    const radioOptions = [
      { value: 'insecure', label: _t.labelInsecure, disabled: !ready }
    ];
    if (bip38) {
      radioOptions.push({ value: 'secure', label: _t.labelSecure, disabled: !ready });
    }

    return (
      <div style={{ margin: '30px auto' }}>
        {_t.printWallet}
        <div style={{ fontSize: 'smaller' }}>{_t.enterPassphrase}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Passphrase { ...{ passphrase, onChange: this.onChangePassphrase }} />
          <button
            className='btn btn-success btn-xs'
            style={{ padding: '5px 10px 0px 10px' }}
            onClick={() => { this.onChangeReady(ready) }}
            disabled={!valid || passphrase.length === 0}
          >
            <Ready size={{ width: 18, height: 18 }} />
          </button>
        </div>
        
        {radioOptions.length > 1 ? (
          <div style={{ marginTop: 10 }}>
            <RadioButtonGroup options={radioOptions} onChange={this.onChangeMode} value={mode} />
          </div>
        ) : false}
        {mode === 'secure' ?
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 5 }}>
              <TextInput
                value={valid ? password : ''}
                onChange={this.onChange}
                placeholder={_t.yourPassword}
                disabled={!ready}
                style={{
                  textAlign: 'center',
                  float: 'left',
                  width: '88%'
                }}
              />
              <button
                className={'btn btn-xs btn-warning'}
                disabled={!valid || password.length === 0}
                style={{
                  padding: "2px 10px",
                  float: 'right'
                }}
                onClick={() => {
                  if (password && valid) {
                    this.loadFrame();
                  }
                }}
              >
                <img 
                  src={`media/${encrypting ? 'loader365thumb.gif' : 'lock-solid.svg'}`} 
                  style={{ width: 'auto', height: 12 }}
                  alt='Submit Password'
                />
              </button>
            </div>
          </div> : false
        }
        <div style={{ textAlign: 'center' }}>
          {
            isElectron() || isMobile() ? (
              downloading ?
                iframe :
                (
                  pdfUrl 
                  ? 
                  <button
                    className='btn btn-success'
                    onClick={() => { this.setState({ downloading: true }) }}>
                    {_t.printWallet}
                  </button> 
                  : false
                )
                
            )
              : iframe
          }
        </div>
      </div>
    );

  }
}