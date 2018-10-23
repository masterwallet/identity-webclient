export const hasBip38 = (setup, network) => {
  if (
    network && network.length === 3 // network = BTC, ETH etc
    && setup 
    && setup.networksConfig
    && setup.networksConfig.data 
    && setup.networksConfig.data.length > 0
     
  ) {
    const networkData = setup.networksConfig.data.find(data => data.value === network);
    if (networkData && networkData.BIP38 !== undefined) {
      return networkData.BIP38;
    }
  }
  return false
};