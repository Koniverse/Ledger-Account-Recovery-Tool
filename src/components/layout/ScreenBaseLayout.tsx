import CN from 'classnames';
import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../../types';
import ScreenHeader from './ScreenHeader';

interface Props extends ThemeProps {
  children?: React.ReactNode;
}

const Component: React.FC<Props> = ({ children, className }: Props) => {
  return (
        <div className={CN(className, 'screen-layout-container')}>
            <div className='screen-layout-background'></div>

            <div className='screen-layout-container-content'>
                <ScreenHeader />
                <div className='screen-body'>
                    {children}
                </div>
            </div>
        </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ScreenBaseLayout = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    backgroundColor: token.colorBgDefault,
    height: '100%',
    position: 'relative',

    '.screen-layout-background': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 330,
      zIndex: 0,
      backgroundImage: 'linear-gradient(180deg, rgba(0, 75, 255, 0.10) 16.47%, rgba(217, 217, 217, 0.00) 94.17%)'
    },

    '.screen-layout-container-content': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 1
    },

    '.screen-body': {
      flex: 1,
      overflow: 'auto'
    }
  };
});

export default ScreenBaseLayout;
