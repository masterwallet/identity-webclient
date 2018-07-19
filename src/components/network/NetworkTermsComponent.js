import React from 'react';
import styled from 'styled-components';
import { fetchPlain } from './../../services/ApiRequest';
import Loader from './../../components/controls/Loader';
import { ErrorBox } from './../../components/panel/ErrorBox';
import MarkdownRenderer from 'react-markdown-renderer';

const Wrapper = styled.div`
  text-align: justify;
  font-size: 14px;
  max-width: 960px;
  margin: 0px auto;
  h1 { font-size: 1.5em; }
`;

export class NetworkTermsComponent extends React.Component {
  state = {
    isLoading: false,
    error: '',
    terms: {}
  };

  componentWillMount() {
    const { network } = this.props;
    if (!this.state.terms[network]) {
      this.setState({isLoading: true, error: ''})
      fetchPlain(`/api/networks/${network}/terms`)
        .then(content => {
          const { terms } = {...this.state};
          terms[network] = content;
          this.setState({isLoading: false, error: '', terms})
        })
        .catch(e => {
          this.setState({isLoading: false, error: e.toString()})
        });
    }
  }

  render() {
    const { network } = this.props;
    const { isLoading, error, terms } = this.state;
    if (isLoading) return <Loader />;
    if (error) return <ErrorBox style={{ marginTop: 135 }}>{error}</ErrorBox>;

    return (
      <Wrapper>
        <MarkdownRenderer markdown={terms[network]} />
      </Wrapper>
    );
  }

}
