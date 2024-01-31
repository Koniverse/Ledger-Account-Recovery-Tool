// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ModalContext } from '@subwallet/react-ui';
import React, { useContext } from 'react';

interface Props {
  children: React.ReactNode;
}

export const WalletModalContext: React.FC<Props> = ({ children }: Props) => {
  const { hasActiveModal } = useContext(ModalContext);

  return <>
    <div
      id='popup-container'
      style={{ zIndex: hasActiveModal ? undefined : -1 }}
    />
    {children}
  </>;
};
