import CN from 'classnames';
import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../../types';

type Props = ThemeProps & {
  children?: React.ReactNode;
};

const Component: React.FC<Props> = ({ children, className }) => {
  return (
        <div className={CN(className, 'screen-body-content')}>
            <div className={'screen-body-content-inner'}>
                {children}
            </div>
            {/* <ScreenFooter /> */}
        </div>
  );
};

const ScreenBodyContent = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',

    '.screen-body-content-inner': {
      width: '100%'
    }
  };
});

export default ScreenBodyContent;
