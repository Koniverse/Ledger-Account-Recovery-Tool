import { ChainInfoMap } from '@subwallet/chain-list';
import slipp44 from '@metamask/slip44';
export interface SubstrateAppParams {
  name: string;
  slug: string;
  symbol?: string;
  cla?: number;
  slip0044: string;
  ss58_addr_type: number;
}
export const LEDGER_SUPPORT_NETWORK = ['polkadot', 'kusama', 'polymesh', 'dockPosMainnet', 'centrifuge', 'edgeware', 'equilibrium_parachain', 'genshiro', 'statemint', 'statemine', 'nodle', 'sora_substrate', 'polkadex', 'bifrost_dot', 'karura', 'reef', 'acala', 'xx_network', 'parallel', 'astar', 'composableFinance', 'stafi', 'aleph', 'interlay', 'unique_network', 'bifrost'];
const NETWORKS_WITH_SAME_SLIP44 = {
  polkadot: ['polkadot', 'statemint', 'interlay', 'parallel', 'composableFinance']
};

export const LEDGER_NETWORKS: SubstrateAppParams[] = LEDGER_SUPPORT_NETWORK.map((network) => {
  const chainInfo = ChainInfoMap?.[network];
  if (!chainInfo) {
    return null;
  }
  const { name, slug, substrateInfo } = chainInfo;
  if (!substrateInfo) {
    return null;
  }
  const { symbol, addressPrefix } = substrateInfo;

  if (symbol === undefined) {
    return null;
  }
  const slipp44Array = Object.values(slipp44);
  let slipp44Entry;

  // TODO: Need update chainList: the symbol of 'xx_network' from 'xx' to 'XX`
  if (NETWORKS_WITH_SAME_SLIP44.polkadot.includes(slug)) {
    slipp44Entry = slipp44Array.find((entry) => entry.symbol === 'DOT');
  } else if (symbol === 'xx') {
    slipp44Entry = slipp44Array.find((entry) => entry.symbol === 'XX');
  } else {
    slipp44Entry = slipp44Array.find((entry) => entry.symbol === symbol);
  }
  if (!slipp44Entry) {
    return null;
  }

  const { index: slip0044 } = slipp44Entry;
  return {
    name,
    slug,
    symbol,
    slip0044,
    ss58_addr_type: addressPrefix
  };
}).filter((entry) => entry !== null) as SubstrateAppParams[];

const NOT_LISTED_ON_CHAINLIST: SubstrateAppParams[] = [
  {
    name: 'Stafi',
    slug: 'stafi',
    symbol: 'FIS',
    slip0044: '907',
    ss58_addr_type: 20
  },
  {
    name: 'Reef',
    slug: 'reef',
    symbol: 'REEF',
    slip0044: '819',
    ss58_addr_type: 42
  }
];
LEDGER_NETWORKS.push(...NOT_LISTED_ON_CHAINLIST);
