import React from 'react';
// import styled from 'styled-components';
// import { Exchanges } from './../../config/Exchanges';
import { fetchJson } from './../../services/ApiRequest';
import { ErrorBox } from './../../components/panel/ErrorBox';
import Loader from './Loader';
import RadioButtonGroup from './RadioButtonGroup';

export class ExchangeSelector extends React.Component {
  state = {
    isLoading: true,
    error: '',
    list: []
  }
  componentWillMount() {
    this.setState({ isLoading: true, error: '', list: [] });
    fetchJson('/api/exchanges').then(data => {
      this.setState({ isLoading: false, error: '', list: data.data.exchanges });
    }).catch(e => {
      this.setState({ isLoading: false, error: e, list: [] });
    });
  }
  render() {
    const { isLoading, error, list } = this.state;
    if (isLoading) return (<Loader />);
    if (error) return <ErrorBox>{error.toString()}</ErrorBox>;
    const { value, onChange } = this.props;
    const options = list.map(n => ({
      value: n.value,
      shiftTop: 10,
      children: [(
        <div key={n.value} style={{ display: 'flex' }}>
          <div style={{ lineHeight: '40px', width: 30 }}>
            <img src={n.icon} alt='' style={{ width: 'auto', height: 25 }} />
          </div>
          <div style={{ lineHeight: '40px', color: '#735cbe' }}>{n.name}</div>
        </div>
      )]
    }));
    return (<RadioButtonGroup {...{value, options, onChange}} />);
  }
}
