import { Networks } from './Networks';

const findNetwork = (network) => Networks.filter(n => (n.value === network))[0];

export const InstallationMenu = [
  '/welcome',
  '/terms',
  '/privacy',
  '/storage',
  '/shake',
  '/seed/24',
  '/confirm/seed',
  '/pin',
  '/confirm/pin',
  '/setup/complete'
];

export const CreateMenu = (network, testnet) => {
  const props = network ? findNetwork(network) : {};
  const terms = props.terms ? [`/create/${network}/terms`] : [];
  const net = testnet ? [`/create/${network}/url`]: [];
  return ['create'].concat(net).concat(terms).concat([
    `/create/${network}/name`,
    `/create/${network}/wallet`,
    `/create/${network}/paper`
  ]);
}

export const ImportMenu = (network, testnet) => {
  const props = network ? findNetwork(network) : {};
  const terms = props.terms ? [`import/${network}/terms`] : [];
  const net = testnet ? [`/import/${network}/url`] : [];
  return ['import'].concat(net).concat(terms).concat([
    `/import/${network}/name`,
    `/import/${network}/wallet`,
    `/import/${network}/complete`
  ]);
}

export const WatchMenu = (network, testnet) => {
  const net = testnet ? [`/import/${network}/url`] : [];
  return [ 'watch'].concat(net).concat([
    `/watch/${network}/name`,
    `/watch/${network}/wallet`,
    `/watch/${network}/complete`
  ]);
};

export const ExchangeMenu = exchange => [
  '/exchange',
  `/exchange/${exchange}/name`,
  `/exchange/${exchange}/account`,
  `/exchange/${exchange}/complete`
];

export const findWizardStep = (menu, needle) => {
  const items = menu.map((m, index) => (m.indexOf(needle) > -1 ? index : null)).filter(i => i !== null);
  return items.length > 0 ? items[0] : -1;
};
