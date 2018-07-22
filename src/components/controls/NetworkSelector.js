import React from 'react';
import { NetSwitcher } from './NetSwitcher';
import { fetchJson } from './../../services/ApiRequest';
import { ErrorBox } from './../../components/panel/ErrorBox';
import Loader from './Loader';
import RadioButtonGroup from './RadioButtonGroup';

export class NetworkSelector extends React.Component {
  state = {
    isLoading: true,
    error: '',
    list: []
  }
  componentWillMount() {
    this.setState({ isLoading: true, error: '', list: [] });
    fetchJson('/api/networks').then(data => {
      this.setState({ isLoading: false, error: '', list: data.data.networks });
    }).catch(e => {
      this.setState({ isLoading: false, error: e, list: [] });
    });
  }
  render() {
    const { isLoading, error, list } = this.state;
    if (isLoading) return (<Loader />);
    if (error) return <ErrorBox>{error.toString()}</ErrorBox>;
    const { value, section, onChange, isTestNet, onTestNet } = this.props;
    const sortFunc = (v1, v2) => (v1.name.localeCompare(v2.name));
    const options = list.sort(sortFunc).map(n => {
      const disabled = (n.disabled === true) || (n.disabled && n.disabled.indexOf(section) > -1);
      return {
        value: n.value,
        shiftTop: 10,
        disabled,
        children: [(
          <div key={n.value} style={{ display: 'flex' }}>
            <div style={{ width: 30, lineHeight: '40px' }}>
              <img src={n.icon} alt='' style={{ width: 'auto', height: 25 }} />
            </div>
            <div style={{
              lineHeight: '40px', fontWeight: 'bold', color: disabled ? '#888' : '#44c28b', width: 40, textAlign: 'center'
            }}>{n.value}</div>
            <div style={{
              lineHeight: '40px', color: disabled ? '#888': '#735cbe'
            }}>{n.name}</div>
          </div>
        )]
      };
    });
    return (
      <div>
        <NetSwitcher isTestNet={isTestNet} onChange={onTestNet} />
        <RadioButtonGroup {...{value, options, onChange}} />
      </div>
    );
  }
}
