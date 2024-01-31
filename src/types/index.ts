// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SubstrateNetwork } from '@polkadot/networks/types';
import { InputProps, theme as SwReactUI } from '@subwallet/react-ui';
import { ThemeConfig as _ThemeConfig, Web3LogoMap } from '@subwallet/react-ui/es/config-provider/context';
import { AliasToken as _AliasToken, GlobalToken as _GlobalToken } from '@subwallet/react-ui/es/theme/interface';
import logoMap from '@subwallet/react-ui/es/theme/themes/logoMap';
import { AssetLogoMap, ChainLogoMap } from '@subwallet/chain-list';

import { Callbacks, FieldData, FormInstance as _FormInstance, Rule } from 'rc-field-form/lib/interface';

export type ThemeConfig = _ThemeConfig;
export type AliasToken = _AliasToken;
export type GlobalToken = _GlobalToken;
export enum ThemeNames {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ExtraToken {
  bodyBackgroundColor: string;
  tokensScreenSuccessBackgroundColor: string;
  tokensScreenDangerBackgroundColor: string;
  tokensScreenInfoBackgroundColor: string;
}

export interface Theme {
  id: ThemeNames;
  name: string;
  token: GlobalToken;

  // todo: add extend token later
  extendToken: ExtraToken;
  logoMap: Web3LogoMap;
}

export interface SwThemeConfig extends ThemeConfig {
  id: ThemeNames;
  name: string;

  generateExtraTokens: (token: AliasToken) => ExtraToken;

  customTokens: (token: AliasToken) => AliasToken;
  logoMap: Web3LogoMap;
}

function genDefaultExtraTokens (token: AliasToken): ExtraToken {
  return {
    bodyBackgroundColor: token.colorBgDefault,
    tokensScreenSuccessBackgroundColor: 'linear-gradient(180deg, rgba(76, 234, 172, 0.1) 16.47%, rgba(217, 217, 217, 0) 94.17%)',
    tokensScreenDangerBackgroundColor: 'linear-gradient(180deg, rgba(234, 76, 76, 0.1) 16.47%, rgba(217, 217, 217, 0) 94.17%)',
    tokensScreenInfoBackgroundColor: 'linear-gradient(180deg, rgba(0, 75, 255, 0.1) 16.47%, rgba(217, 217, 217, 0) 94.17%)'
  };
}

// todo: will standardized logoMap later
const defaultLogoMap: Web3LogoMap = {
  network: {
    ...ChainLogoMap
  },
  symbol: {
    ...AssetLogoMap
  },
  default: logoMap.default as string
};

// Todo: i18n for theme name
// Implement theme from @subwallet/react-ui
export const SW_THEME_CONFIGS: Record<ThemeNames, SwThemeConfig> = {
  [ThemeNames.DARK]: {
    id: ThemeNames.DARK,
    name: 'Dark',
    algorithm: SwReactUI.darkAlgorithm,
    customTokens: (token) => (token),
    generateExtraTokens: (token) => {
      return { ...genDefaultExtraTokens(token) };
    },
    logoMap: defaultLogoMap
  },
  [ThemeNames.LIGHT]: {
    id: ThemeNames.LIGHT,
    name: 'Light',
    algorithm: SwReactUI.darkAlgorithm,
    customTokens: (token) => (token),
    generateExtraTokens: (token) => {
      return { ...genDefaultExtraTokens(token) };
    },
    logoMap: defaultLogoMap
  }
};

export function generateTheme ({
  customTokens,
  generateExtraTokens,
  id,
  logoMap,
  name
}: SwThemeConfig, token: GlobalToken): Theme {
  return {
    id,
    name,
    token: customTokens(token),
    extendToken: generateExtraTokens(token),
    logoMap
  };
}

export interface ThemeProps {
  theme: Theme;
  className?: string;
}

export interface LedgerNetwork extends SubstrateNetwork {
  slug: string;
}

export type FormCallbacks<Values> = Callbacks<Values>;
export type FormFieldData = FieldData;
export type FormRule = Rule;
export type FormInstance<Values> = _FormInstance<Values>;

export interface BasicInputEvent<T = string> {
  target: {
    value: T;
  };
}

export type BasicOnChangeFunction<T = string> = (event: BasicInputEvent<T>) => void;

export interface BasicInputWrapper<T = string> {
  id?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: T;
  value?: T;
  disabled?: boolean;
  loading?: boolean;
  onChange?: BasicOnChangeFunction<T>;
  onBlur?: InputProps['onBlur'];
  onFocus?: InputProps['onFocus'];
  status?: InputProps['status'];
  statusHelp?: InputProps['statusHelp'];
  readOnly?: boolean;
  tooltip?: string;
  title?: string;
}
