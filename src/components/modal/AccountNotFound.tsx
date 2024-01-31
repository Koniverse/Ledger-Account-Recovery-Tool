import { Button, ModalContext, PageIcon } from '@subwallet/react-ui';
import CN from 'classnames';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { ThemeProps } from 'types/index';
import { Users } from 'phosphor-react';
import { BaseModal } from 'components/modal/BaseModal';

interface Props extends ThemeProps {
  id?: string;
  setFormMode: React.Dispatch<React.SetStateAction<FormMode>>;
  handleAdvanceMode: () => void;
}
enum FormMode {
  BASIC = 'basic',
  ADVANCE = 'advance'
}
const modalId = 'account-not-found-modal';
const Component: React.FC<Props> = (props: Props) => {
  const { className, id, setFormMode } = props;

  const { activeModal, inactiveModal } = useContext(ModalContext);

  const openModal = useCallback(() => {
    activeModal(modalId);
  }, [activeModal]);

  const closeModal = useCallback(() => {
    inactiveModal(modalId);
  }, [inactiveModal]);

  const handleAdvanceMode = useCallback(() => {
    closeModal();
    setFormMode(FormMode.ADVANCE);
  }, [closeModal, setFormMode]);

  return (
      <>
        <BaseModal
            id={modalId}
            className={CN(className, 'account-not-found')}
            onCancel={closeModal}
            title={'Account not found'}
            center={true}
            closable={false}
        >
          <div className={'__modal-body'}>
              <PageIcon
                  color='#D9D9D9'
                  iconProps={{
                    weight: 'fill',
                    phosphorIcon: Users
                  }}
              />
            <div className={'__content'}>
              Unable to find your account. Re-enter your account information or try Advanced mode
            </div>
          </div>
          <div className={'__account-not-found'}>
            <Button
                onClick={closeModal}
                type={'ghost'}
                block={true}
                className={'__go-back'}
            >
              Go back
            </Button>
            <Button
                onClick={handleAdvanceMode}
                block={true}
                className={'__advanced-mode'}
            >
              Advanced mode
            </Button>
          </div>

        </BaseModal>
      </>
  );
};

const AccountNotFound = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.__account-not-found': {
      display: 'flex',
      flex: 1,
      gap: token.size,
      justifyContent: 'space-between',
      width: 'auto'
    },
    '.__go-back': {
      padding: token.padding,
      backgroundColor: token.colorBgSecondary,
      borderRadius: token.borderRadiusLG
    },
    '.__modal-body': {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    '.__content': {
      lineHeight: token.lineHeightSM,
      color: token.colorTextLight4,
      paddingBottom: token.padding,
      paddingTop: token.paddingMD,
      fontSize: token.fontSizeSM,
      paddingLeft: token.padding,
      paddingRight: token.padding
    },
    '.ant-sw-modal-content.ant-sw-modal-content': {
      borderRadius: 8
    },
    '.ant-sw-modal-body': {
      paddingBottom: 0
    },
    '@media(max-width: 330px)': {
      '.__account-not-found': {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
  };
});

export default AccountNotFound;
