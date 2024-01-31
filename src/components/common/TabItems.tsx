// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ThemeProps } from 'types/index';
import CN from 'classnames';
import React, { useCallback } from 'react';
import styled from 'styled-components';

export interface FilterTabItemType {
  label: string;
  value: string;
}
enum FormMode {
  BASIC = 'basic',
  ADVANCE = 'advance'
}

type Props = ThemeProps & {
  items: FilterTabItemType[];
  selectedItem: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
};

function Component ({ className = '', items, onSelect, disabled, selectedItem }: Props): React.ReactElement<Props> {
  const onClick = useCallback((value: string) => {
    return () => {
      if (!disabled) {
        onSelect(value as FormMode);
      }
    };
  }, [disabled, onSelect]);

  return (
    <div className={className}>
      {
        items.map((i) => (
          <div
            className={CN('__tab-item', {
              '-active': i.value === selectedItem,
              '-disabled': disabled
            })}
            key={i.value}
            onClick={onClick(i.value)}
            tabIndex={-1}
          >
            <div className={'__tab-item-label'}>
              {i.label}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export const TabItems = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    display: 'flex',
    gap: token.size,

    '.__tab-item': {
      cursor: 'pointer',
      color: token.colorTextLight4,
      transition: `color ${token.motionDurationMid}`
    },

    '.__tab-item-label': {
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      paddingTop: token.sizeXS + 2,
      paddingBottom: token.sizeXS,
      fontWeight: token.headingFontWeight,
      'white-space': 'nowrap'
    },

    '.__tab-item:after': {
      content: "''",
      display: 'block',
      borderTopWidth: 2,
      borderTopStyle: 'solid',
      transition: `opacity ${token.motionDurationMid}`,
      opacity: 0
    },

    '.__tab-item.-active': {
      color: token.colorTextLight2,

      '&:after': {
        opacity: 1
      }
    },

    '.__tab-item.-disabled': {
      cursor: 'not-allowed'
    }
  };
});
