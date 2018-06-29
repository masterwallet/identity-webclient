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

export const CreateMenu = network => [
  '/create',
  `/import/${network}/name`,
  `/create/${network}/wallet`,
  `/create/${network}/complete`
];

export const ImportMenu = network => [
  '/import',
  `/import/${network}/name`,
  `/import/${network}/wallet`,
  `/import/${network}/complete`
];

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
