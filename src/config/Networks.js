// more BTC forks can be discovered here:
// https://btcdiv.com/
export const Networks = [
  {
    value: 'B2X', name: 'Segwit 2X', icon: '/networks/B2X.png',
    local: 'http://localhost:8333'
  },
  {
    value: 'BCH', name: 'Bitcoin Cash', icon: '/networks/BCH.png',
    local: 'http://localhost:8333'
  },
  {
    value: 'BTC', name: 'Bitcoin', icon: '/networks/BTC.png',
    local: 'http://localhost:8333'
  },
  {
    value: 'BTD', name: 'Bitcoin Diamond', icon: '/networks/BTD.png',
    local: 'http://localhost:8333'
  },
  {
    value: 'BTG', name: 'Bitcoin Gold', icon: '/networks/BTG.png',
    local: 'http://localhost:18338',
    spec: 'https://github.com/BTCGPU/BTCGPU/wiki/Technical-Spec'
  },
  {
    value: 'EOS', name: 'EOS', terms: true, icon: '/networks/EOS.png',
    local: 'http;//localhost:8888',
    testnet: [
      { name: 'Jungle TestNet', explorer: 'http://dev.cryptolions.io/' },
      { name: 'Scholar TestNet', explorer: 'https://scholar.eosnation.io/' }
    ]
  },
  {
    value: 'ETC', name: 'Ethereum Classic', icon: '/networks/ETC.png', EIP55: true,
    local: 'http://localhost:8545'
  },
  {
    value: 'ETH', name: 'Ethereum', icon: '/networks/ETH.png', EIP55: true,
    local: 'http://localhost:8545',
    testnet: [
      { name: 'Rinkeby', explorer: 'https://rinkeby.etherscan.io/' },
      { name: 'Ropsten', explorer: 'https://ropsten.etherscan.io/' },
      { name: 'Kovan', explorer: 'https://kovan.etherscan.io/' },
      { name: 'Tobalaba', explorer: 'https://tobalaba.etherscan.com/' }
    ]
  },
  {
    value: 'LTC', name: 'Litecoin', icon: '/networks/LTC.png',
    local: 'http://localhost:19335'
  },
  {
    value: 'NEO', name: 'NEO', icon: '/networks/NEO.png',
    local: 'http://localhost:20332'
  },
  {
    value: 'WAN', name: 'Wanchain', icon: '/networks/WAN.png', EIP55: true,
    local: 'http://localhost:8546'
  }
];
