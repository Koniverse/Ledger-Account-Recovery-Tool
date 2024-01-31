export interface SubstrateAppParams {
  name: string;
  slug: string;
  cla: number;
  slip0044: string;
  ss58_addr_type: number;
}
export const LEDGER_SUPPORT_NETWORK = ['kusama', 'polkadot', 'polymesh', 'dock', 'centrifuge', 'edgeware', 'equilibrium', 'genshiro', 'statemint', 'statemine', 'nodle', 'sora', 'polkadex', 'bifrost', 'karura', 'reef', 'acala', 'xxnetwork', 'parallel', 'astar', 'composable', 'stafi', 'alephzero', 'interlay', 'unique', 'bifrostkusama'];
export const SUPPORTED_APPS: SubstrateAppParams[] = [
  {
    name: 'Polkadot',
    slug: 'polkadot',
    cla: 0x90,
    slip0044: '0x80000162',
    ss58_addr_type: 0
  },
  {
    name: 'Polymesh',
    slug: 'polymesh',
    cla: 0x91,
    slip0044: '0x80000253',
    ss58_addr_type: 12
  },
  {
    name: 'Dock',
    slug: 'dock',
    cla: 0x92,
    slip0044: '0x80000252',
    ss58_addr_type: 22
  },
  {
    name: 'Centrifuge',
    slug: 'centrifuge',
    cla: 0x93,
    slip0044: '0x800002eb',
    ss58_addr_type: 36
  },
  {
    name: 'Edgeware',
    slug: 'edgeware',
    cla: 0x94,
    slip0044: '0x8000020b',
    ss58_addr_type: 7
  },
  {
    name: 'Equilibrium',
    slug: 'equilibrium',
    cla: 0x95,
    slip0044: '0x85f5e0fd',
    ss58_addr_type: 67
  },
  {
    name: 'Statemint',
    slug: 'statemint',
    cla: 0x96,
    slip0044: '0x80000162',
    ss58_addr_type: 0
  },
  {
    name: 'Statemine',
    slug: 'statemine',
    cla: 0x97,
    slip0044: '0x800001b2',
    ss58_addr_type: 2
  },
  {
    name: 'Nodle',
    slug: 'nodle',
    cla: 0x98,
    slip0044: '0x800003eb',
    ss58_addr_type: 37
  },
  {
    name: 'Kusama',
    slug: 'kusama',
    cla: 0x99,
    slip0044: '0x800001b2',
    ss58_addr_type: 2
  },
  {
    name: 'Karura',
    slug: 'karura',
    cla: 0x9a,
    slip0044: '0x800002ae',
    ss58_addr_type: 8
  },
  {
    name: 'Acala',
    slug: 'acala',
    cla: 0x9b,
    slip0044: '0x80000313',
    ss58_addr_type: 10
  },
  {
    name: 'VTB',
    slug: 'vtb',
    cla: 0x9c,
    slip0044: '0x800002b6',
    ss58_addr_type: 42
  },
  {
    name: 'Peer',
    slug: 'peer',
    cla: 0x9d,
    slip0044: '0x800002ce',
    ss58_addr_type: 42
  },
  {
    name: 'Genshiro',
    slug: 'genshiro',
    cla: 0x9e,
    slip0044: '0x85f5e0fc',
    ss58_addr_type: 67
  },
  {
    name: 'Sora',
    slug: 'sora',
    cla: 0x9f,
    slip0044: '0x80000269',
    ss58_addr_type: 69
  },
  {
    name: 'Polkadex',
    slug: 'polkadex',
    cla: 0xa0,
    slip0044: '0x8000031f',
    ss58_addr_type: 88
  },
  {
    name: 'Bifrost',
    slug: 'bifrost',
    cla: 0xa1,
    slip0044: '0x80000314',
    ss58_addr_type: 6
  },
  {
    name: 'Reef',
    slug: 'reef',
    cla: 0xa2,
    slip0044: '0x80000333',
    ss58_addr_type: 42
  },
  {
    name: 'xx Network',
    slug: 'xxnetwork',
    cla: 0xa3,
    slip0044: '0x800007a3',
    ss58_addr_type: 55
  },
  {
    name: 'Aleph Zero',
    slug: 'alephzero',
    cla: 0xa4,
    slip0044: '0x80000283',
    ss58_addr_type: 42
  },
  {
    name: 'Interlay',
    slug: 'interlay',
    cla: 0xa5,
    slip0044: '0x80000162',
    ss58_addr_type: 2032
  },
  {
    name: 'Parallel',
    slug: 'parallel',
    cla: 0xa6,
    slip0044: '0x80000162',
    ss58_addr_type: 172
  },
  {
    name: 'Picasso',
    slug: 'picasso',
    cla: 0xa7,
    slip0044: '0x800001b2',
    ss58_addr_type: 49
  },
  {
    name: 'Composable',
    slug: 'composable',
    cla: 0xa8,
    slip0044: '0x80000162',
    ss58_addr_type: 49
  },
  {
    name: 'Astar',
    slug: 'astar',
    cla: 0xa9,
    slip0044: '0x8000032a',
    ss58_addr_type: 5
  },
  {
    name: 'OriginTrail',
    slug: 'origintrail',
    cla: 0xaa,
    slip0044: '0x80000162',
    ss58_addr_type: 101
  },
  {
    name: 'HydraDX',
    slug: 'hydradx',
    cla: 0xab,
    slip0044: '0x80000162',
    ss58_addr_type: 63
  },
  {
    name: 'Stafi',
    slug: 'stafi',
    cla: 0xac,
    slip0044: '0x8000038b',
    ss58_addr_type: 20
  },
  {
    name: 'Unique',
    slug: 'unique',
    cla: 0xad,
    slip0044: '0x80000295',
    ss58_addr_type: 7391
  },
  {
    name: 'Bifrost Kusama',
    slug: 'bifrostkusama',
    cla: 0xae,
    slip0044: '0x80000314',
    ss58_addr_type: 6
  },
  {
    name: 'Phala',
    slug: 'phala',
    cla: 0xaf,
    slip0044: '0x80000162',
    ss58_addr_type: 30
  },
  {
    name: 'Khala',
    slug: 'khala',
    cla: 0xb1,
    slip0044: '0x800001b2',
    ss58_addr_type: 30
  },
  {
    name: 'Darwinia',
    slug: 'darwinia',
    cla: 0xb2,
    slip0044: '0x80000162',
    ss58_addr_type: 18
  },
  {
    name: 'Ajuna',
    slug: 'ajuna',
    cla: 0xb3,
    slip0044: '0x80000162',
    ss58_addr_type: 1328
  },
  {
    name: 'Bittensor',
    slug: 'bittensor',
    cla: 0xb4,
    slip0044: '0x800003ed',
    ss58_addr_type: 42
  },
  {
    name: 'Ternoa',
    slug: 'ternoa',
    cla: 0xb5,
    slip0044: '0x800003e3',
    ss58_addr_type: 42
  },
  {
    name: 'Pendulum',
    slug: 'pendulum',
    cla: 0xb6,
    slip0044: '0x80000162',
    ss58_addr_type: 56
  },
  {
    name: 'Zeitgeist',
    slug: 'zeitgeist',
    cla: 0xb7,
    slip0044: '0x80000162',
    ss58_addr_type: 73
  },
  {
    name: 'Joystream',
    slug: 'joystream',
    cla: 0xb8,
    slip0044: '0x80000219',
    ss58_addr_type: 126
  },
  {
    name: 'Enjin',
    slug: 'enjin',
    cla: 0xb9,
    slip0044: '0x80000483',
    ss58_addr_type: 2135
  },
  {
    name: 'Matrixchain',
    slug: 'matrixchain',
    cla: 0xba,
    slip0044: '0x80000483',
    ss58_addr_type: 1110
  },
  {
    name: 'Quartz',
    slug: 'quartz',
    cla: 0xbb,
    slip0044: '0x80000277',
    ss58_addr_type: 255
  }
];
