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
  `/create/${network}/wallet`,
  `/create/${network}/complete`
];

export const ImportMenu = network => [
  '/import',
  `/import/${network}/wallet`,
  `/import/${network}/complete`
];

export const WatchMenu = network => [
  '/watch',
  `/watch/${network}/wallet`,
  `/watch/${network}/complete`
];

export const ExchangeMenu = exchange => [
  '/exchange',
  `/exchange/${exchange}/account`,
  `/exchange/${exchange}/complete`
];
