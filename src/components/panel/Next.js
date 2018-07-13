import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonLink = ({ disabled = false, children, to, onClick }) => {
  const className = `btn btn-primary btn-sm ${disabled ? 'disabled': ''}`;
  return disabled ? 
    <span {...{className}}>{children}</span> : 
    <Link {...{className, to, onClick}}>{children}</Link>;
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 1001;
  &.right {
    right: 5px;
    top: 5px;
    a .title, span .title { margin-right: 15px; }
  }
  &.left {
    left: 5px;
    top: 5px;
    a .title, span .title { margin-left: 15px; }
  }

  a.btn, span.btn {
    display: flex;
    align-items: center;

    background: transparent;
    font-weight: bold;
    color: #262327;
    border-top: 1px #6239bf solid;
    border-bottom: 1px #61c38b solid;

    border-radius: 0px;
  }
  a.btn:hover {
    opacity: 0.9;
    background: #fff;
    color: #6b4afa;
    border-top: 1px #61c38b solid;
    border-bottom: 1px #6239bf solid;
  }
  span.btn.disabled {    
    border: gray !important;
    color: gray !important;
  }
  @media(max-width: 480px) {
    a .title, span .title {
      display: none;
    }
  }
`;

const ChevronRight = ({ style = {} }) => (
  <svg viewBox="0 0 256 512"  style={{ ...style, width: 10 }}>
    <path fill="currentColor" d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z" />
  </svg>
);

export class Next extends React.Component {
  state = {
    redirected: ''
  };
  onKeyPress = (e) => {
    if (e.keyCode === 13 && !this.props.disabled) { 
      this.setState({ redirected: this.props.to });
    }
  }
  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress, false);
  }
  render() {
    const { title, to, disabled = false } = this.props;
    const { redirected } = this.state;
    if (redirected && !disabled) {
      return (<Redirect to={redirected} />);
    }
    return (
      <Wrapper className="right">
        <ButtonLink {...{disabled, to}}>
          <span className="title">{title}</span>
          <ChevronRight />
        </ButtonLink>
      </Wrapper>
    );
  }
}

const ChevronLeft = () => (<ChevronRight style={{ transform: 'scale(-1, 1)' }} />);

export class Prev extends React.Component {
  state = {
    redirected : ''
  };
  onKeyPress = (e) => {
    const backKeys = [27];
    if (backKeys.indexOf(e.keyCode) !== -1 && !this.props.disabled) { 
      this.setState({ redirected: this.props.to });
    }
  }
  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress, false);
  }
  render() {
    const { title, to, disabled = false } = this.props;
    const { redirected } = this.state;
    if (redirected && !disabled) {
      return (<Redirect to={redirected} />);
    }
    return (
      <Wrapper className="left">
        <ButtonLink {...{disabled, to}}>
          <ChevronLeft />
          <span className="title">{title}</span>
        </ButtonLink>
      </Wrapper>
    )
  }
}
