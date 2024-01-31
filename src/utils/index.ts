import { decodeAddress, Keyring } from '@polkadot/keyring';
import { KeyringPair$Json } from '@polkadot/keyring/types';
import { isArray } from '@polkadot/util';
import { Keypair } from '@polkadot/util-crypto/types';
import { ALL_ACCOUNT_KEY, LEDGER_ACCOUNT_TYPE, THEME_BACKGROUND_COLOR } from '../constants';
import { FormFieldData, FormRule } from 'types/index';
import { encodeAddress, ethereumEncode, isEthereumAddress } from '@polkadot/util-crypto';

const keyring = new Keyring({ type: LEDGER_ACCOUNT_TYPE });
export const MinPasswordLength = 8;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,}$/;

export const exportJsonKeypair = (pair: Keypair, password: string): KeyringPair$Json => {
  const keyPair = keyring.createFromPair(pair, { name: 'Ledger Recovery' }, LEDGER_ACCOUNT_TYPE);

  return keyPair.toJson(password);
};

export const applyPreloadStyle = (bodyBackground?: string): void => {
  const backgroundColor = bodyBackground || localStorage.getItem(THEME_BACKGROUND_COLOR) || '#1A1A1A';

  document.body.style.backgroundColor = backgroundColor;

  localStorage.setItem(THEME_BACKGROUND_COLOR, backgroundColor);
};

export const renderBasePasswordRules = (fieldName: string): FormRule[] => {
  return [
    {
      message: (`${fieldName} must be at least ${MinPasswordLength} characters in length`),
      min: MinPasswordLength
    },
    {
      message: (`${fieldName} is required`),
      required: true
    },
    {
      message: (`${fieldName} should be at least 1 uppercase letter, 1 number, and 1 special character`),
      pattern: passwordRegex,
      warningOnly: true
    }
  ];
};

export const renderBaseConfirmPasswordRules = (fieldName: string, passwordFieldName: string): FormRule[] => {
  return [
    ...renderBasePasswordRules(fieldName),
    ({ getFieldValue }) => ({
      validator: async (_, value) => {
        const password = getFieldValue(passwordFieldName) as string;

        if (!value || password === value) {
          await Promise.resolve();
          return;
        }

        const error = new Error((`${fieldName} do not match!`).replaceAll(`${fieldName}`, fieldName));

        return await Promise.reject(error);
      }
    })
  ];
};

// RequiredFields: '*': check all | '--x': exclude x | 'x': include x
export const simpleCheckForm = (allFields: FormFieldData[], requiredFields: string[] = ['*']): { empty: boolean; error: boolean } => {
  const error = allFields.map((data) => data.errors || [])
    .reduce((old, value) => [...old, ...value], [])
    .some((value) => !!value);

  const empty = allFields.some((data) => {
    const value = data.value as unknown;
    const names = isArray(data.name) ? data.name : [data.name];

    let checkAll = false;

    const required: string[] = [];
    const ignored: string[] = [];

    for (const requiredField of requiredFields) {
      if (requiredField === '*') {
        checkAll = true;
      } else if (requiredField.startsWith('--')) {
        const name = requiredField.slice(2);

        ignored.push(name);
      } else {
        required.push(requiredField);
      }
    }

    const ignorePass = ignored.length ? ignored.every((name) => !names.includes(name)) : true;
    const requirePass = required.length ? required.some((name) => names.includes(name)) : true;

    const needCheck = checkAll || (ignorePass && requirePass);

    return !needCheck ? false : typeof value === 'boolean' ? false : !value;
  });

  return {
    error,
    empty
  };
};
export function isSameAddress (address1: string, address2: string) {
  if (isEthereumAddress(address1)) {
    return address1.toLowerCase() === address2.toLowerCase();
  }

  return reformatAddress(address1, 0) === reformatAddress(address2, 0); // TODO: maybe there's a better way
}
export function isAccountAll (address?: string): boolean {
  return address === ALL_ACCOUNT_KEY;
}
export function reformatAddress (address: string, networkPrefix = 42, isEthereum = false): string {
  try {
    if (!address || address === '') {
      return '';
    }

    if (isEthereumAddress(address)) {
      return address;
    }

    if (isAccountAll(address)) {
      return address;
    }

    const publicKey = decodeAddress(address);

    if (isEthereum) {
      return ethereumEncode(publicKey);
    }

    if (networkPrefix < 0) {
      return address;
    }

    return encodeAddress(publicKey, networkPrefix);
  } catch (e) {
    console.warn('Get error while reformat address', address, e);

    return address;
  }
}
