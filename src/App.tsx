import { encodeAddress, hdLedger, isAddress, isEthereumAddress, mnemonicValidate } from '@polkadot/util-crypto';
import { Button, Form, Input, ModalContext } from '@subwallet/react-ui';
import CN from 'classnames';
import ExportJson from 'components/modal/ExportJson';
import React, { ClipboardEventHandler, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProps } from 'types/index';
import { LEDGER_NETWORKS } from './constants';
import styled from 'styled-components';
import { ScreenBaseLayout, ScreenBodyContent } from 'components/layout';
import AccountNotFound from 'components/modal/AccountNotFound';
import { NetworkSelector } from 'components/modal';
import { RuleObject } from '@subwallet/react-ui/es/form';
import { Callbacks } from 'rc-field-form/lib/interface';
import { FilterTabItemType, TabItems } from 'components/common/TabItems';
import type { Keypair } from '@polkadot/util-crypto/types';
import { isSameAddress } from 'utils/index';

export type FormCallbacks<Values> = Callbacks<Values>;

type Props = ThemeProps;

enum FormMode {
  BASIC = 'basic',
  ADVANCE = 'advance'
}

interface FormProps {
  network: string;
  mnemonic: string;
  address: string;
  accountIndex: string;
  addressIndex: string;
}

interface BasicModePassedValues {
  network: string;
  mnemonic: string;
  address: string;
}

interface PairAndAddress {
  pair: Keypair;
  address: string;
}

const ACCOUNT_404_MODAL_ID = 'account-not-found-modal';
const EXPORT_JSON_MODAL_ID = 'password-modal';

const findNetworkObject = (network: string) => LEDGER_NETWORKS.find((item) => item.slug === network);
const getPairAndAddress = (mnemonic: string, network: string, accountIndexValue: string, addressIndexValue: string): PairAndAddress | undefined => {
  const networkObject = findNetworkObject(network);

  if (networkObject && mnemonic && accountIndexValue && addressIndexValue) {
    const path = `m/44'/${networkObject.slip0044}'/${accountIndexValue}'/0'/${addressIndexValue}'`;
    const getValuePair = hdLedger(mnemonic, path);

    return {
      pair: getValuePair,
      // @ts-ignore
      address: encodeAddress(getValuePair.publicKey, networkObject.ss58_addr_type)
    };
  }

  return undefined;
};

const getTargetAddressPair = (targetAddress: string, mnemonic: string, network: string) => {
  for (let i = 0; i < 100; i++) {
    const pairAndAddress = getPairAndAddress(mnemonic, network, i.toString(), '0');
    // @ts-ignore
    if (pairAndAddress?.address && isSameAddress(pairAndAddress.address, targetAddress)) {
      return pairAndAddress.pair;
    }
  }

  return undefined;
};

const App: React.FC<Props> = (props: Props) => {
  const { className } = props;
  const [addressToShow, setAddressToShow] = useState('');
  const [formMode, setFormMode] = useState<FormMode>(FormMode.BASIC);
  const [pair, setPair] = useState<Keypair>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [basicModePassedValues, setBasicModePassedValues] = useState<BasicModePassedValues | undefined>();

  const [form] = Form.useForm<FormProps>();

  const { activeModal, inactiveModal } = useContext(ModalContext);

  // trick to clear form error
  const [formRenderKey, setFormRenderKey] = useState('form-key');

  const onChangeFormMode = useCallback((mode: string) => {
    setFormMode(mode as FormMode);
    setFormRenderKey(`form-key-${Date.now()}`);
  }, []);

  const handleAdvanceMode = useCallback(() => {
    setFormMode(FormMode.ADVANCE);
    inactiveModal(ACCOUNT_404_MODAL_ID);
  }, [inactiveModal]);

  const formDefault = useMemo((): FormProps => ({
    network: LEDGER_NETWORKS[0]?.slug ?? '',
    mnemonic: '',
    address: '',
    accountIndex: '0',
    addressIndex: '0'
  }), []);

  const filterTabItems = useMemo<FilterTabItemType[]>(() => {
    return [
      {
        label: ('Basic mode'),
        value: FormMode.BASIC
      },
      {
        label: ('Advanced mode'),
        value: FormMode.ADVANCE
      }
    ];
  }, []);

  const mnemonicValidator = useCallback(async (rule: RuleObject, mnemonic: string): Promise<void> => {
    if (!mnemonic.trim()) {
      throw new Error(('This field is required'));
    }

    if (!mnemonicValidate(mnemonic.trim())) {
      throw new Error(('Invalid seed phrase'));
    }

    await Promise.resolve();
  }, []);

  const addressValidator = useCallback(async (rule: RuleObject, address: string): Promise<void> => {
    if (formMode === FormMode.ADVANCE) {
      await Promise.resolve();
      return;
    }
    if (!address) {
      throw new Error(('This field is required'));
    }
    if (!isAddress(address) || isEthereumAddress(address)) {
      throw new Error(('Invalid address'));
    }

    await Promise.resolve();
  }, [formMode]);

  const accountIndexValidator = useCallback(async (rule: RuleObject, accountIndex: string): Promise<void> => {
    if (formMode === FormMode.BASIC) {
      await Promise.resolve();
      return;
    }
    if (!accountIndex) {
      throw new Error(('This field is required'));
    }

    const accountIndexNumber = +accountIndex;

    if (isNaN(accountIndexNumber) || !Number.isInteger(accountIndexNumber)) {
      throw new Error(('Account index must be integer'));
    }

    if (accountIndexNumber < 0) {
      throw new Error(('Account index must be greater than or equal to 0'));
    }

    await Promise.resolve();
  }, [formMode]);

  const addressIndexValidator = useCallback(async (rule: RuleObject, addressIndex: string): Promise<void> => {
    if (formMode === FormMode.BASIC) {
      await Promise.resolve();
      return;
    }
    if (!addressIndex) {
      throw new Error(('This field is required'));
    }

    const addressIndexNumber = +addressIndex;

    if (isNaN(addressIndexNumber) || !Number.isInteger(addressIndexNumber)) {
      throw new Error(('Address index must be integer'));
    }

    if (addressIndexNumber < 0) {
      throw new Error(('Address index must be greater than or equal to 0'));
    }

    await Promise.resolve();
  }, [formMode]);

  const updateAddressToShow = useCallback((mnemonic: string, network: string, addressIndex: string, accountIndex: string) => {
    if (!network || !mnemonic || !addressIndex || !accountIndex) {
      setAddressToShow('');
      return;
    }

    try {
      const pairAndAddress = getPairAndAddress(mnemonic, network, accountIndex, addressIndex);

      if (pairAndAddress) {
        setAddressToShow(pairAndAddress.address);
      } else {
        setAddressToShow('');
      }
    } catch (e) {
      setAddressToShow('');
    }
  }, []);

  const onValuesChange: FormCallbacks<FormProps>['onValuesChange'] = useCallback((changes: Partial<FormProps>, values: FormProps) => {
    const { network, mnemonic, addressIndex, accountIndex } = values;

    if (formMode === FormMode.ADVANCE) {
      updateAddressToShow(mnemonic, network, addressIndex, accountIndex);
    }
  }, [formMode, updateAddressToShow]);

  const onSubmit: FormCallbacks<FormProps>['onFinish'] = useCallback((values: FormProps) => {
    const {
      address,
      mnemonic,
      network,
      addressIndex,
      accountIndex
    } = values;

    if (formMode === FormMode.BASIC) {
      // due to single thread problem, related to display loading state, the handle will move to useEffect

      setLoading(true);
      setBasicModePassedValues({
        address,
        mnemonic,
        network
      });
    } else {
      try {
        const pairAndAddress = getPairAndAddress(mnemonic, network, accountIndex, addressIndex);

        if (pairAndAddress) {
          setPair(pairAndAddress.pair);
          activeModal(EXPORT_JSON_MODAL_ID);
        } else {
          // do nothing, will not happen
        }
      } catch (e) {

      }
    }
  }, [formMode, activeModal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (basicModePassedValues) {
        const { address, mnemonic, network } = basicModePassedValues;

        try {
          const _pair = getTargetAddressPair(address, mnemonic, network);

          if (_pair) {
            setPair(_pair);
            activeModal(EXPORT_JSON_MODAL_ID);
          } else {
            activeModal(ACCOUNT_404_MODAL_ID);
          }
        } catch (e) {
          activeModal(ACCOUNT_404_MODAL_ID);
        }

        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [basicModePassedValues, activeModal]);

  useEffect(() => {
    if (formMode === FormMode.ADVANCE) {
      const { network, mnemonic, addressIndex, accountIndex } = form.getFieldsValue();

      updateAddressToShow(mnemonic, network, addressIndex, accountIndex);
    }
  }, [form, formMode, updateAddressToShow]);
  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };
  const onPaste = useCallback<ClipboardEventHandler<HTMLInputElement>>((event) => {
    const data = event.clipboardData.getData('text');

    const { selectionEnd: j, selectionStart: i, value } = event.currentTarget;
    const newValue = `${value.substring(0, i || 0)}${data}${value.substring(j || 0)}`;

    if (isNaN(+newValue) || !Number.isInteger(+newValue)) {
      event.preventDefault();
    }
  }, []);

  return (
      <>
        <ScreenBaseLayout>
          <ScreenBodyContent className={CN(className, 'body-content')}>
            <div className={'home-intro'}>
              <div className={'home-intro-description'}>
                This tool allows you to use your seed phrase to export your Ledger account into a JSON file, which can
                then be imported into SubWallet and used on any Polkadot-SDK network. Use it at your own risk.
              </div>
              <div className={'home-intro-description-ledger'}>
                As a security best practice, we recommend moving all your funds from all accounts on your Ledger away
                after exporting the JSON file and resetting your Ledger with a new seed phrase.
              </div>
            </div>
            <TabItems selectedItem={formMode} items={filterTabItems} onSelect={onChangeFormMode} disabled={loading} />
            <div key={formRenderKey}>
              <Form
                  form={form}
                  initialValues={formDefault}
                  onFinish={onSubmit}
                  onValuesChange={onValuesChange}
              >
                <Form.Item
                    name={'network'}
                    className={'network-selector'}
                >
                  <NetworkSelector
                      items={LEDGER_NETWORKS}
                  />
                </Form.Item>
                <Form.Item
                    help={error}
                    rules={[
                      {
                        validator: mnemonicValidator
                      }
                    ]}
                    name={'mnemonic'}
                    validateStatus={error ? 'error' : undefined}
                >
                  <Input.TextArea
                      label={'Seed phrase'}
                      placeholder="Enter the seed phrase of your Ledger account"
                      rows={3}
                      tabIndex={1}
                  />
                </Form.Item>
                <Form.Item
                    className={CN({
                      hidden: formMode === FormMode.ADVANCE
                    }, 'btn-basic-mode')}
                    rules={[
                      {
                        validator: addressValidator
                      }
                    ]}
                    name={'address'}
                >
                  <Input
                      label={'Account address'}
                      placeholder={'Account address'}
                      tabIndex={4}
                  />
                </Form.Item>

                <div className={CN({
                  hidden: formMode === FormMode.BASIC
                }, 'input-form-index')}>
                  <div className={'account-index'}>
                  <Form.Item
                      name={'accountIndex'}
                      rules={[
                        {
                          validator: accountIndexValidator
                        }
                      ]}
                  >
                    <Input
                        label={'Account index'}
                        placeholder={'Account index'}
                        type="number"
                        step={1}
                        min={0}
                        onPaste={onPaste}
                        onKeyPress={onKeyPress}
                        tabIndex={2}
                    />
                  </Form.Item>
                  </div>
                  <div className={'address-index'}>
                  <Form.Item
                      name={'addressIndex'}
                      rules={[
                        {
                          validator: addressIndexValidator
                        }
                      ]}
                  >
                    <Input
                        label={'Address index'}
                        placeholder={'Address index'}
                        type="number"
                        step={1}
                        min={0}
                        onPaste={onPaste}
                        onKeyPress={onKeyPress}
                        tabIndex={3}
                    />
                  </Form.Item>
                  </div>
                </div>
                <div className={ CN({ hidden: formMode === FormMode.BASIC }, 'btn-advance-mode')}>
                <Input
                    label={'Account address'}
                    placeholder={'Account address'}
                    className={CN({ hidden: formMode === FormMode.BASIC }, 'input-advance')}
                    value={addressToShow}
                    readOnly={true}
                    tabIndex={4}
                />
                </div>
              </Form>
            </div>
            <div className={'home-btn'}>
            <Button
                block={true}
                disabled={loading}
                loading={loading}
                onClick={form.submit}
            >
              Export JSON file
            </Button>
            </div>
            <ExportJson pair={pair} />
            <AccountNotFound setFormMode={setFormMode} handleAdvanceMode={handleAdvanceMode} />
          </ScreenBodyContent>
        </ScreenBaseLayout>
      </>
  );
};

export default styled(App)<Props>(({ theme: { token } }: Props) => {
  return {
    maxWidth: 600,
    marginRight: 'auto',
    marginLeft: 'auto',
    boxSizing: 'border-box',
    height: '100%',
    margin: '0 auto',
    textAlign: 'left',
    position: 'relative',
    '.home-intro': {
      color: token.colorTextDescription
    },
    '.home-intro-description': {
      paddingBottom: token.paddingXXS,
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      fontFamily: 'Plus Jakarta Sans'
    },
    '.home-intro-description-ledger': {
      paddingBottom: 22,
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      fontFamily: 'Plus Jakarta Sans'
    },
    '.input-form-index': {
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
      width: 'auto',
      overflow: 'hidden'
    },
    '.btn-advance-mode': {
      marginBottom: 32
    },
    '.input-advance .ant-input': {
      cursor: 'not-allowed'
    },
    '.btn-basic-mode': {
      paddingBottom: 20
    },
    '.account-index': {
      flex: 1,
      overflow: 'hidden'
    },
    '.address-index': {
      flex: 1,
      overflow: 'hidden'
    },
    '.home-btn': {
      display: 'flex',
      width: 'auto',
      marginLeft: 108,
      marginRight: 108,
      marginBottom: 30
    },
    '.network-selector': {
      paddingTop: 24
    },
    '.ant-form-item': {
      marginBottom: 12
    },
    '.__tab-item-label': {
      paddingBottom: 10
    },

    '@media(max-width: 767px)': {
      paddingLeft: token.padding,
      paddingRight: token.padding
    },

    '@media(max-width: 500px)': {
      '.home-btn': {
        marginLeft: 0,
        marginRight: 0
      },
      '.input-form-index': {
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        gap: 0
      }
    }
  };
});
