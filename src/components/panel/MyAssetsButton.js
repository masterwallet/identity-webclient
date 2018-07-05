import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1001;
  left: 5px;
  top: 15px;

  a.btn {
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

  a .title { margin-left: 15px; }
  @media(max-width: 480px) {
    a .title {
      display: none;
    }
  }
`;

const ChveronLeft = () => (
  <svg viewBox="0 0 256 512"  style={{ transform: 'scale(-1, 1)', width: 10 }}>
    <path fill="currentColor" d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z" />
  </svg>
);

export const MyAssetsButton = ({ title = 'My Assets' }) => (
  <Wrapper>
    <Link to={'/assets/combined'} className="btn btn-primary btn-sm">
      <ChveronLeft />
      <span className="title">{title}</span>
    </Link>
  </Wrapper>
);
