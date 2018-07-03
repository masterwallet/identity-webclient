import React from 'react';
import { WalletPanel } from './../panel/index';
import { Totals } from './../panel/Totals';

export const WalletBalanceComponent = () => 
{ 
  const address = '0xAA2303232020302302323030303030';
  const network = 'ETH';
  const name = 'My ETH Wallet';
  const icon = '/networks/ETH.png';
  return (
    <WalletPanel {...{ address, name, network, icon }}>

      <Totals value={'1,144'} currency={'USD'} />
      <br />
      TODO: transactions
      <br />
      TODO: send button
      <br />
      TODO: receive button

      <br />
      <br />
      lorem ipsum
    </WalletPanel>
  );
}