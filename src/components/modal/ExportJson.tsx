import { Keypair } from '@polkadot/util-crypto/types';
import { Button, Form, Input, ModalContext, SwModal } from '@subwallet/react-ui';
import CN from 'classnames';
import { ScreenContext } from 'contexts/ScreenContext';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FormCallbacks, FormFieldData, ThemeProps } from 'types/index';
import { exportJsonKeypair, renderBaseConfirmPasswordRules, renderBasePasswordRules, simpleCheckForm } from 'utils/index';
import { BaseModal } from 'components/modal/BaseModal';

interface Props extends ThemeProps {
  pair?: Keypair;
}

const modalId = 'password-modal';
const formName = 'create-password-form';

interface CreatePasswordFormState {
  password: string;
  passwordConfirm: string;
}

const downloadJson = (json: unknown, name: string) => {
  const blob = new Blob([JSON.stringify(json)], { type: 'text/json' });
  const link = document.createElement('a');

  link.download = `${name}.json`;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  link.dispatchEvent(evt);
  link.remove();
};

const Component: React.FC<Props> = (props: Props) => {
  const { className, pair } = props;

  const { activeModal, inactiveModal } = useContext(ModalContext);
  const { isWebUI } = useContext(ScreenContext);

  const [error, setError] = useState<string>();

  const defaultData = useMemo((): CreatePasswordFormState => {
    return {
      password: '',
      passwordConfirm: ''
    };
  }, []);
  const passwordRules = useMemo(() => renderBasePasswordRules('Password'), []);
  const confirmPasswordRules = useMemo(() => renderBaseConfirmPasswordRules('Confirm password', 'password'), []);

  const [form] = Form.useForm<CreatePasswordFormState>();
  const [isDisabled, setIsDisable] = useState(true);

  const openModal = useCallback(() => {
    activeModal(modalId);
    form.resetFields();
  }, [activeModal, form]);

  const closeModal = useCallback(() => {
    inactiveModal(modalId);
    form.resetFields();
  }, [inactiveModal, form]);

  const onSubmit: FormCallbacks<CreatePasswordFormState>['onFinish'] = useCallback((values: CreatePasswordFormState) => {
    const password = values.password;
    if (password && pair) {
      try {
        const json = exportJsonKeypair(pair, password);
        downloadJson(json, 'Ledger Recovery');

        closeModal();
      } catch (err) {
        setError((err as Error).message);
      }
    }
  }, [closeModal, pair]);

  const onValuesChange: FormCallbacks<CreatePasswordFormState>['onValuesChange'] = useCallback((changes: Partial<CreatePasswordFormState>, all: CreatePasswordFormState) => {
    if ('password' in changes) {
      form.resetFields(['confirmPassword']);
    }
  }, [form]);

  const onFieldsChange: FormCallbacks<CreatePasswordFormState>['onFieldsChange'] = useCallback((changedFields: FormFieldData[], allFields: FormFieldData[]) => {
    const { empty, error } = simpleCheckForm(allFields);

    setIsDisable(error || empty);
  }, []);

  const onConfirmPasswordKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      form.submit();
    }
  }, [form]);

  const onChangePassword = useCallback(() => {
    form.resetFields(['passwordConfirm']);
  }, [form]);

  return (
    <>
      <div className={CN(className, 'home-btn')}>
      </div>

      <BaseModal
        id={modalId}
        onCancel={closeModal}
        title={'Export JSON file'}
        className={CN(className, 'export-json')}
        center={true}
        closable={false}
      >
        <div className={'__modal_intro'}>
          Create a password to protect your JSON file. Your password should have at least 8 characters with both letters and numbers.
        </div>
        <Form
          form={form}
          initialValues={defaultData}
          name={formName}
          onFieldsChange={onFieldsChange}
          onValuesChange={onValuesChange}
          onFinish={onSubmit}
          layout={'vertical'}
        >
          <Form.Item
            name={'password'}
            rules={passwordRules}
            statusHelpAsTooltip={isWebUI}
          >
            <Input
              placeholder={'Enter password'}
              onChange={onChangePassword}
              type='password'
            />
          </Form.Item>
          <Form.Item
            name={'passwordConfirm'}
            rules={confirmPasswordRules}
            statusHelpAsTooltip={isWebUI}
          >
            <Input
              onKeyDown={onConfirmPasswordKeyPress}
              placeholder={'Confirm password'}
              type='password'
            />
          </Form.Item>
          <Form.Item>
            <div className={'__footer-button'}>
            <Button
                onClick={closeModal}
                className={'__cancel-btn'}
                type={'ghost'}
                block={true}
            >
              Cancel
            </Button>
            <Button
              disabled={isDisabled}
              className={'__export-json'}
              onClick={form.submit}
              block={true}
            >
              Export JSON file
            </Button>
            </div>
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
};

const ExportJson = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.__modal_intro': {
      color: token.colorTextDescription,
      paddingBottom: token.padding,
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM
    },
    '.__footer-button': {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      gap: token.sizeSM,
      justifyContent: 'space-between',
      width: 'auto'
    },
    '.__cancel-btn': {
      padding: token.padding,
      backgroundColor: token.colorBgSecondary,
      borderRadius: token.borderRadiusLG
    },
    '.__submit-btn': {
      padding: token.padding
    },
    '&.home-btn': {
      marginLeft: 104,
      marginRight: 104
    },
    '.export-json': {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    '.ant-sw-modal-content.ant-sw-modal-content': {
      borderRadius: 8,
      width: 384
    },
    '.ant-sw-modal-body': {
      paddingBottom: 0
    },
    '@media(max-width: 330px)': {
      '.__footer-button': {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
  };
});

export default ExportJson;
