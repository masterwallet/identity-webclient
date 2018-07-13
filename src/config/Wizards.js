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
  const terms = props.terms ? [`/create/terms`] : [];
  const net = testnet ? [`/create/url`]: [];
  return ['/create'].concat(net).concat(terms).concat([
    `/create/name`,
    `/create/wallet`,
    `/create/paper`
  ]);
}

export const ImportMenu = (network, testnet) => {
  const props = network ? findNetwork(network) : {};
  const terms = props.terms ? [`/import/terms`] : [];
  const net = testnet ? [`/import/url`] : [];
  return ['/import'].concat(net).concat(terms).concat([
    `/import/name`,
    `/import/wallet`,
    `/import/complete`
  ]);
}

export const WatchMenu = (network, testnet) => {
  const net = testnet ? [`/watch/url`] : [];
  return [ '/watch'].concat(net).concat([
    `/watch/name`,
    `/watch/wallet`,
    `/watch/complete`
  ]);
};

export const ExchangeMenu = network => [
  '/exchange',
  `/exchange/name`,
  `/exchange/account`,
  `/exchange/complete`
];

export const findWizardStep = (menu, needle) => {
  const items = menu.map((m, index) => (m.indexOf(needle) > -1 ? index : null)).filter(i => i !== null);
  return items.length > 0 ? items[0] : -1;
};
