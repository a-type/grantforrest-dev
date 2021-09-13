import * as React from 'react';
import { Color } from 'three';

import { day } from './colors';

type ColorContextValue = {
  cloudWhite: Color;
  cloudShadow1: Color;
  cloudShadow2: Color;
  ground: Color;
  groundShadow: Color;
  sky: Color;
  ambientLight: Color;
  light: Color;
  sun: Color;
  text: Color;
  ray: Color;
};

const wrapColors = <T extends { [key: string]: string }>(
  cssColors: T,
): {
  [K in keyof T]: Color;
} =>
  Object.keys(cssColors).reduce(
    (reduced, key) => ({
      ...reduced,
      [key]: new Color(cssColors[key]),
    }),
    {},
  ) as any;

const chooseTheme = () => {
  const now = new Date();
  // if (now.getHours() > 18) {
  //   return sunset;
  // }
  return day;
};

const colorContext = React.createContext<ColorContextValue>(
  wrapColors(chooseTheme()),
);

export const ColorContextProvider = (rest: any) => {
  const [colors, setColors] = React.useState<ColorContextValue>(
    wrapColors(chooseTheme()),
  );
  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setColors(wrapColors(chooseTheme()));
  }, []);

  return <colorContext.Provider value={colors} {...rest} />;
};

export const useColors = () => {
  const ctx = React.useContext(colorContext);
  return ctx;
};
