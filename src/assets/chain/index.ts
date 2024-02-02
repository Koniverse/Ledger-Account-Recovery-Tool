import { ChainLogoMap } from '@subwallet/chain-list';

export const DefaultLogosMap: Record<string, string> = {};

for (const key in ChainLogoMap) {
  const chainName = key;
  const imageUrl = ChainLogoMap[key];
  const imageName = imageUrl?.split('/').pop();

  DefaultLogosMap[chainName] = `./images/chains/${imageName}`;
}
const LogosMapNotExistOnChainList: Record<string, string> = {
  reef: './images/chains/Reef.png',
  stafi: './images/chains/stafi.png'
};
Object.assign(DefaultLogosMap, LogosMapNotExistOnChainList);
