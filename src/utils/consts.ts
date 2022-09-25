export const SS58_FORMAT = 37;

export const RESPONSIVE_BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  tablet: 1024,
};
export const ROUTES = {
  accounts: '/account',
  blocks: '/block',
  extrinsics: '/extrinsic',
  events: '/event',
  transfers: '/transfer',
  omnigraph: '/network',
  color_schemes: '/color_scheme',
};

export const SI: { power: number; text: string; value: string }[] = [
  { power: -24, text: 'yocto', value: 'y' },
  { power: -21, text: 'zepto', value: 'z' },
  { power: -18, text: 'atto', value: 'a' },
  { power: -15, text: 'femto', value: 'f' },
  { power: -12, text: 'pico', value: 'p' },
  { power: -9, text: 'nano', value: 'n' },
  { power: -6, text: 'micro', value: 'µ' },
  { power: -3, text: 'milli', value: 'm' },
  { power: 0, text: 'NODL', value: '-' }, // mid
  /*   { power: 3, text: 'Kilo', value: 'k' },
  { power: 6, text: 'Mill', value: 'M' },
  { power: 9, text: 'Bill', value: 'B' },
  { power: 12, text: 'Tril', value: 'T' },
  { power: 15, text: 'Peta', value: 'P' },
  { power: 18, text: 'Exa', value: 'E' },
  { power: 21, text: 'Zeta', value: 'Z' },
  { power: 24, text: 'Yotta', value: 'Y' }, */
];
