import React from 'react';
// import { fetchPlain } from './../../services/ApiRequest';

export class NetworkTermsComponent extends React.Component {
  state = {
    isLoading: false,
    error: '',
    terms: {
      'EOS': 'Network Terms here....'
    }
  };

  componentWillMount() {
    const { network } = this.props;
    //fetchPlain(`/api/networks/${network}/terms`)
    //  .then(content => {
    //    const { terms } = { ...this.state };
    //    terms[network] = content;
    //    this.setState({ isLoading: false, error: '', terms })
    //  });
  }

  render() {
    return (<div style={{ textAlign: 'center' }}>{this.state.terms.EOS}</div>);
  }

}
