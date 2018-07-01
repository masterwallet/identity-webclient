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

export const CreateMenu = network => {
  const props = network ? findNetwork(network) : {};
  const terms = props.terms ? [`/create/${network}/terms`] : [];
  return ['create'].concat(terms).concat([
    `/create/${network}/name`,
    `/create/${network}/wallet`,
    `/create/${network}/paper`
  ]);
}

export const ImportMenu = network => {
  const props = network ? findNetwork(network) : {};
  const terms = props.terms ? [`import/${network}/terms`] : [];
  return ['import'].concat(terms).concat([
    `/import/${network}/name`,
    `/import/${network}/wallet`,
    `/import/${network}/complete`
  ]);
}

export const WatchMenu = network => [
  '/watch',
  `/watch/${network}/name`,
  `/watch/${network}/wallet`,
  `/watch/${network}/complete`
];

export const ExchangeMenu = exchange => [
  '/exchange',
  `/exchange/${exchange}/name`,
  `/exchange/${exchange}/account`,
  `/exchange/${exchange}/complete`
];
