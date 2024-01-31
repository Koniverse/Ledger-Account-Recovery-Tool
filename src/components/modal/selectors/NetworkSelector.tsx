// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Icon, InputRef, Logo, NetworkItem } from '@subwallet/react-ui';
import { CheckCircle } from 'phosphor-react';
import React, { ForwardedRef, forwardRef, useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';

import { BasicInputWrapper, Theme, ThemeProps } from 'types/index';

import { BaseSelectModal } from 'components/modal/BaseSelectModal';
import { useSelectModalInputHelper } from 'hooks/index';
import { SubstrateAppParams } from 'constants/supportedApp';
import GeneralEmptyList from 'components/common/GeneralEmptyList';

interface Props extends ThemeProps, BasicInputWrapper {
  items: SubstrateAppParams[];
}

function Component (props: Props, ref: ForwardedRef<InputRef>): React.ReactElement<Props> {
  const { className = '', disabled, id = 'network-selector', items, label, placeholder, statusHelp, title, tooltip, value } = props;
  const { token } = useTheme() as Theme;
  const { onSelect } = useSelectModalInputHelper(props, ref);

  const renderEmpty = () => <GeneralEmptyList />;
  const renderNetworkSelected = useCallback((item: SubstrateAppParams) => {
    return (
        <>
        <div className={'__selected-item'}>{item.name}</div>
        </>
    );
  }, []);

  const networkLogoNode = useMemo(() => {
    return (
        <Logo
            className='__network-logo'
            network={value}
            shape='circle'
            size={token.sizeMD}
        />
    );
  }, [token.sizeMD, value]);

  const renderItem = useCallback((item: SubstrateAppParams, selected: boolean) => {
    return (
        <NetworkItem
            name={item.name}
            networkKey={item.slug}
            networkMainLogoShape='squircle'
            networkMainLogoSize={28}
            rightItem={selected && (<div className={'__check-icon'}>
              <Icon
                  customSize={'20px'}
                  iconColor={token.colorSuccess}
                  phosphorIcon={CheckCircle}
                  type='phosphor'
                  weight='fill'
              />
            </div>)}
        />
    );
  }, [token]);

  const searchFunction = useCallback((item: SubstrateAppParams, searchText: string) => {
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchTextLowerCase)
    );
  }, []);

  return (
      <BaseSelectModal
          className={`${className} network-selector-modal`}
          inputClassName={`${className} network-selector-input`}
          id={id}
          tooltip={tooltip}
          disabled={disabled}
          renderItem={renderItem}
          selected={value ?? ''}
          placeholder={placeholder || 'Select network'}
          prefix={value !== '' && networkLogoNode}
          renderSelected={renderNetworkSelected}
          itemKey={'slug'}
          onSelect={onSelect}
          items={items}
          statusHelp={statusHelp}
          title={title || label || placeholder || 'Select network'}
          renderWhenEmpty={renderEmpty}
          searchFunction={searchFunction}
          searchMinCharactersCount={2}
          searchPlaceholder={('Search network')}
      />
  );
}

const NetworkSelector = styled(forwardRef(Component))<Props>(({ theme: { token } }: Props) => {
  return ({
    '&.ant-select-modal-input-container .ant-select-modal-input-wrapper': {
      paddingLeft: 12,
      paddingRight: 12
    },

    '&.network-selector-input': {
      '.__selected-item, .__loading-text': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },

      '.__selected-item': {
        color: token.colorText
      },

      '.__loading-text': {
        color: token.colorTextLight4
      }
    },

    '.__network-logo': {
      margin: '-1px 0'
    },

    '.ant-network-item .__check-icon': {
      display: 'flex',
      width: 40,
      justifyContent: 'center'
    }
  });
});

export default NetworkSelector;
