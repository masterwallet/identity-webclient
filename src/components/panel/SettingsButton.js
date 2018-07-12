import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const TopLeftWrapper = styled.div`
  position: fixed;
  z-index: 1001;
  left: 5px;
  top: 5px;
  display: flex; 
  
  
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

  a .title { margin-left: 10px; }
  @media(max-width: 480px) {
    a .title {
      display: none;
    }
  }
`;

const _t = {
  settings: 'Settings',
  add: 'Add'
};

const SvgPlus = () => (
  <svg width={16} height={16} viewBox="0 0 1000 1000">
    <path fill="#000000" d="M500,10c66.6,0,130.1,12.9,190.5,38.8c60.4,25.9,112.5,60.7,156.3,104.4c43.7,43.7,78.5,95.8,104.4,156.3S990,433.4,990,500c0,66.6-12.9,130.1-38.8,190.5c-25.9,60.4-60.7,112.5-104.4,156.3S751,925.3,690.5,951.2C630.1,977.1,566.6,990,500,990c-66.6,0-130.1-12.9-190.5-38.8c-60.4-25.9-112.5-60.7-156.3-104.4S74.7,751,48.8,690.5C22.9,630.1,10,566.6,10,500c0-66.6,12.9-130.1,38.8-190.5c25.9-60.4,60.7-112.5,104.4-156.3c43.7-43.7,95.8-78.5,156.3-104.4C369.9,22.9,433.4,10,500,10z M500,99.1c-54.3,0-106.2,10.6-155.7,31.8c-49.5,21.2-92.2,49.7-127.9,85.4c-35.7,35.7-64.2,78.4-85.4,127.9C109.7,393.8,99.1,445.7,99.1,500c0,54.3,10.6,106.2,31.8,155.7c21.2,49.5,49.7,92.2,85.4,127.9c35.7,35.7,78.4,64.2,127.9,85.4s101.4,31.8,155.7,31.8c54.3,0,106.2-10.6,155.7-31.8s92.2-49.7,127.9-85.4c35.7-35.7,64.2-78.4,85.4-127.9s31.8-101.4,31.8-155.7c0-54.3-10.6-106.2-31.8-155.7c-21.2-49.5-49.7-92.2-85.4-127.9c-35.7-35.7-78.4-64.2-127.9-85.4C606.2,109.7,554.3,99.1,500,99.1z M500,277.3c12.3,0,22.8,4.3,31.5,13.1s13.1,19.2,13.1,31.5v133.6h133.6c12.3,0,22.8,4.4,31.5,13.1c8.7,8.7,13,19.2,13,31.5s-4.4,22.8-13,31.5c-8.7,8.7-19.2,13.1-31.5,13.1H544.5v133.6c0,12.3-4.4,22.8-13.1,31.5c-8.7,8.7-19.2,13-31.5,13c-12.3,0-22.8-4.4-31.5-13c-8.7-8.7-13.1-19.2-13.1-31.5V544.5H321.8c-12.3,0-22.8-4.4-31.5-13.1c-8.7-8.7-13.1-19.2-13.1-31.5s4.3-22.8,13.1-31.5c8.7-8.7,19.2-13.1,31.5-13.1h133.6V321.8c0-12.3,4.4-22.8,13.1-31.5C477.2,281.6,487.7,277.3,500,277.3z"/>
  </svg>
);

export const SettingsButton = ({ add = false, to, disabled = false }) => (
  <TopLeftWrapper>
    <Link disabled={disabled} to={'/settings'} className="btn btn-primary btn-sm">
      <img src="/media/gears.svg" style={{ width: 20 }} alt={_t.settings} />
      <span className="title">{_t.settings}</span>
    </Link>
    {add ? (
      <Link to={'/add'} className="btn btn-primary btn-sm">
        <SvgPlus />
        <span className="title">{_t.add}</span>
      </Link>
    ): false}
  </TopLeftWrapper>
);
