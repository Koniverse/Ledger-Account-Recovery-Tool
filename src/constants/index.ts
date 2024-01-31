import { LEDGER_SUPPORT_NETWORK, SUPPORTED_APPS } from 'constants/supportedApp';

export const LEDGER_ACCOUNT_TYPE = 'ed25519';
export const LEDGER_NETWORKS = SUPPORTED_APPS.filter(network => LEDGER_SUPPORT_NETWORK.includes(network.slug));
LEDGER_NETWORKS.forEach((network) => {
  const substringValue = network.slip0044.substring(3);
  const slip0044Decimal = BigInt('0x' + substringValue);
  network.slip0044 = slip0044Decimal.toString();
});

export const THEME_BACKGROUND_COLOR = 'theme-background-color';
export const ALL_ACCOUNT_KEY = 'ALL';
