import React from 'react';
import styled from 'styled-components';

export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
`;

const AddressLabel = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  font-weight: bold;
`;

export const Address = ({ value }) => (
  <AddressContainer>
    <AddressLabel title={value}>{value}</AddressLabel>
    <button className="btn btn-xs btn-success" style={{ padding: "2px 10px" }} onClick={() => (copyToClipboard(value))}>
      <img src="/media/copy.png" alt='Copy to Buffer' style={{ width: 'auto', height: 12 }} />
    </button>
  </AddressContainer>
);

export default {
  Address,
  copyToClipboard
};
