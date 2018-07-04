import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1001;
  left: 5px;
  top: 5px;

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

export const SettingsButton = ({ title = 'Settings', to, disabled = false }) => (
  <Wrapper>
    <Link disabled={disabled} to={'/settings'} className="btn btn-primary btn-sm">
      <img src="/media/gears.svg" style={{ width: 20 }} alt={title} />
      <span className="title">{title}</span>
    </Link>
  </Wrapper>
);
