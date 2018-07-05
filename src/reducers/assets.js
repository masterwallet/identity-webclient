
const mockWallets = [
  {
    name: 'EOS Default',
    address: 'E0S0d49804D9367Cf9c11D1Fcc78632887B',
    network: 'EOS',
    icon: '/networks/EOS.png',
    estimate: '1,101',
    currency: 'USD',
    assets: [
      { id: 'EOS', name: 'EOS', amount: '200,303', icon: '/networks/EOS.png' },
      { id: 'EOSDAC', name: 'EOS DAC', amount: '30' },
      { id: 'KARMA', name: 'Karma Token', amount: '25' }
    ]
  },
  {
    name: 'Wallet 1',
    address: '0x111F46382d49804D9367Cf9c11D1Fcc786128c7c',
    network: 'ETH',
    icon: '/networks/ETH.png',
    assets: [
      { id: 'ETH', name: 'Ethereum', amount: '11.003020', icon: '/networks/ETH.png' },
      { id: 'WETH', name: 'Wrapped Ethereum', amount: '3.001020', icon: '/icons/weth_28.png' },
    ]
  },
  {
    name: 'BTC Main Wallet',
    address: '0x000F46382d49804D9367Cf9c11D1Fcc78634447B',
    network: 'BTC',
    icon: '/networks/BTC.png',
    estimate: '201',
    currency: 'USD',
    assets: [
      { id: 'BTC', name: 'Bitcoin', amount: '0.102020', icon: '/networks/BTC.png' },
    ]
  },
  {
    name: 'Kucoin Main Acc',
    address: '23838-93923-30033930',
    network: 'KUCOIN',
    icon: '/exchanges/kucoin.png',
    assets: [

    ]
  },
  {
    name: 'Binance Secondary Account',
    address: 'asdfsdf23-3-04203404040',
    network: 'BINANCE',
    icon: '/exchanges/binance.png',
    assets: [

    ]
  }
];

const mockAssets = [
  { id: 'BTC', name: 'Bitcoin', amount: '0.102020', icon: '/networks/BTC.png' },
  { id: 'EOS', name: 'EOS', amount: '200,303', icon: '/networks/EOS.png' },
  { id: 'EOSDAC', name: 'EOS DAC', amount: '30' },
  { id: 'ETH', name: 'Ethereum', amount: '11.003020', icon: '/networks/ETH.png' },
  { id: 'KARMA', name: 'Karma Token', amount: '25' },
  { id: 'WETH', name: 'Wrapped Ethereum', amount: '3.001020', icon: '/icons/weth_28.png' }
];

const initialState = {
  total: '3,400',
  currency: 'USD',
  showPrices: true,
  wallets: mockWallets || [],
  assets: mockAssets || []
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
  }
  return state
};

