import { SwModal } from '@subwallet/react-ui';
import { SwModalProps } from '@subwallet/react-ui/es/sw-modal/SwModal';
import CN from 'classnames';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeProps } from 'types/index';
import { ScreenContext } from 'contexts/ScreenContext';

type Props = ThemeProps & SwModalProps & {
  center?: boolean;
  fullSizeOnMobile?: boolean;
};

function Component ({ center, children, className, fullSizeOnMobile, motion, ...props }: Props): React.ReactElement<Props> {
  const { isWebUI } = useContext(ScreenContext);

  const _motion = motion || (isWebUI && !center ? 'move-right' : undefined);
  const _width = center ? (!isWebUI ? '100%' : undefined) : '100%';

  return (
    <SwModal
      {...props}
      className={CN(className, {
        '-desktop': isWebUI && !center,
        '-mobile': !isWebUI,
        '-full-size-on-mobile': fullSizeOnMobile
      })}
      motion={_motion}
      width={_width}
    >
      {children}
    </SwModal>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BaseModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    '.ant-sw-modal-content.ant-sw-modal-content': {
      width: '100%'
    },

    '&.-desktop': {
      left: 'auto',
      right: token.paddingLG,
      bottom: token.paddingLG,
      top: token.paddingLG,
      maxWidth: 404,

      '.ant-sw-modal-content': {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        paddingLeft: token.paddingLG,
        paddingRight: token.paddingLG,
        borderRadius: '8px 0 0 8px'
      },

      '.ant-sw-list-section .ant-sw-list-wrapper': {
        flexBasis: 'auto'
      }
    },

    '&.-mobile': {
      justifyContent: 'flex-end',

      '.ant-sw-modal-content.ant-sw-modal-content': {
        maxHeight: '95%',
        width: 'auto',
        marginLeft: token.margin,
        marginRight: token.margin,
        marginBottom: token.marginXXS
      }
    },

    '&.-mobile.-full-size-on-mobile': {
      '.ant-sw-modal-content': {
        height: '100%',
        maxHeight: '100%',
        borderRadius: 0
      }
    }
  });
});
