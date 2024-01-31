// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

export enum ScreenType {
  DESKTOP = 'desktop',
  TABLET_HORIZONTAL = 'tablet_horizontal',
  TABLET_VERTICAL = 'tablet_vertical',
  MOBILE = 'mobile',
}

const ScreenBreakpoint: Record<ScreenType, [number, number?]> = {
  [ScreenType.DESKTOP]: [1025],
  [ScreenType.TABLET_HORIZONTAL]: [992, 1024],
  [ScreenType.TABLET_VERTICAL]: [768, 991],
  [ScreenType.MOBILE]: [0, 767]
};

interface ScreenContextProviderProps {
  children?: React.ReactElement;
}

interface ScreenContextType {
  screenType: ScreenType;
  isWebUI: boolean;
}

export const ScreenContext = React.createContext<ScreenContextType>({
  isWebUI: true,
  screenType: ScreenType.DESKTOP
});

export const ScreenContextProvider: React.FC<ScreenContextProviderProps> = ({ children }: ScreenContextProviderProps) => {
  const [screenType, setScreenType] = React.useState<ScreenType>(ScreenType.DESKTOP);

  const handleWindowResize = React.useCallback(() => {
    Object.keys(ScreenBreakpoint).map((breakpoint: string) => {
      const breakpointKey = breakpoint as ScreenType;
      const [lower, upper] = ScreenBreakpoint[breakpointKey];

      if (!upper) {
        if (lower <= window.innerWidth && screenType !== breakpointKey) {
          setScreenType(breakpointKey);
        }

        return breakpoint;
      }

      if (
        lower <= window.innerWidth &&
        upper >= window.innerWidth &&
        screenType !== breakpointKey
      ) {
        setScreenType(breakpointKey);
      }

      return breakpoint;
    });
  }, [screenType]);

  const isWebUI = useMemo(() => screenType === ScreenType.DESKTOP || screenType === ScreenType.TABLET_HORIZONTAL, [screenType]);

  React.useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <ScreenContext.Provider
      value={{
        screenType,
        isWebUI
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
