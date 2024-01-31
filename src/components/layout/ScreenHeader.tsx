import { Button, Image } from '@subwallet/react-ui';
import CN from 'classnames';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { ScreenContext } from 'contexts/ScreenContext';
import { ThemeProps } from '../../types';

interface Props extends ThemeProps {

}

const Component: React.FC<Props> = ({ className }: Props) => {
  const { isWebUI } = useContext(ScreenContext);

  return (
      <div className={CN(className, 'screen-header', {
        '-mobile': !isWebUI
      })}
      >
          <div className={'__header-left-part'}>
              <div
                  className={'__logo-wrapper'}
              >
                  <Image
                      height='var(--img-height)'
                      src={'./images/logos/swlogo.svg'}
                      width='var(--img-width)'
                      shape={'square'}
                  />
              </div>
          </div>
          <div className={'__mid-part'}>
              Ledger Account Recovery Tool
              <div className={'__subtitle'}>for Polkadot-SDK networks</div>
          </div>
          <div className={'__header-right-part'}>
              <Button
                  className={'__img-user'}
                  href={'https://github.com/Koniverse/SubWallet-Ledger-Recover'}
                  target={'_blank'}
                  type={'ghost'}
              >
                  <Image
                      height='var(--img-height)'
                      src={'./images/logos/question.svg'}
                      width='var(--img-width)'
                  />
                  <span className={'__help'}>Help</span>
              </Button>
          </div>
      </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ScreenHeader = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    padding: token.paddingLG,
    display: 'flex',

    '.__logo-wrapper': {
      cursor: 'pointer'
    },
    '.__mid-part': {
      fontSize: token.fontSizeHeading2,
      flex: 1,
      textAlign: 'center',
      lineHeight: token.lineHeightHeading2
    },
    '.__subtitle': {
      fontSize: token.fontSizeHeading4
    },
    '.__help': {
      paddingLeft: 8,
      alignItems: 'center'
    },
    '.__header-left-part': {
      display: 'flex',
      alignItems: 'center',
      gap: token.sizeXL,
      width: 68
    },

    '.__header-right-part': {
      boxSizing: 'border-box',
      display: 'flex',
      gap: token.paddingMD,
      alignItems: 'center',
      borderRadius: token.borderRadiusLG,
      paddingTop: token.padding,
      paddingBottom: token.padding,
      lineHeight: token.lineHeight

    },
    '@media(max-width: 767px)': {
      '.__mid-part': {
        fontSize: token.fontSizeHeading3,
        flex: 1,
        textAlign: 'center',
        lineHeight: token.lineHeightHeading5
      },

      '.__subtitle': {
        fontSize: token.fontSizeHeading5
      }
    },
    '@media(max-width: 500px)': {
      '.__mid-part': {
        fontSize: token.fontSizeLG,
        flex: 1,
        textAlign: 'center',
        paddingLeft: 4,
        paddingRight: 4
      },

      '.__subtitle': {
        fontSize: token.fontSizeSM
      },
      '.__help': {
        display: 'none'
      },
      '.__header-left-part': {
        display: 'flex',
        alignItems: 'center',
        gap: token.sizeXL,
        width: 'auto'
      },
      '.__header-right-part': {
        boxSizing: 'border-box',
        display: 'flex',
        gap: token.paddingMD,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: token.borderRadiusLG,
        paddingTop: token.padding,
        paddingBottom: token.padding,
        lineHeight: token.lineHeight
      },
      '&.screen-header': {
        paddingLeft: token.padding,
        paddingRight: token.padding,
        display: 'flex',
        alignItems: 'center'
      },
      '.ant-btn': {
        padding: 0
      }
    }
  };
});

export default ScreenHeader;
