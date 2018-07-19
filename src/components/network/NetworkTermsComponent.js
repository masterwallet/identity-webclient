import React from 'react';
import { fetchPlain } from './../../services/ApiRequest';
import Loader from './../../components/controls/Loader';
import { ErrorBox } from './../../components/panel/ErrorBox';

export class NetworkTermsComponent extends React.Component {
  state = {
    isLoading: false,
    error: '',
    terms: {}
  };

  componentWillMount() {
    const { network } = this.props;
    this.setState({ isLoading: true, error: '' })
    fetchPlain(`/api/networks/${network}/terms`)
      .then(content => {
        const { terms } = { ...this.state };
        terms[network] = content;
        this.setState({ isLoading: false, error: '', terms })
      })
      .catch(e => {
        this.setState({ isLoading: false, error: e.toString() })
      });
  }

  render() {
    const { network } = this.props;
    const { isLoading, error, terms } = this.state;
    if (isLoading) return <Loader />;
    if (error) return <ErrorBox style={{ marginTop: 135 }}>{error}</ErrorBox>;

    return (
      <div style={{ textAlign: 'justify', fontSize: 12 }}>
        {terms[network]}
      </div>
    );
  }

}
