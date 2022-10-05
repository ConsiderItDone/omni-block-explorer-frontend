import { Theme } from 'theme-ui';
import darkTheme from './dark';
import lightTheme from './light';

export const getTheme = (primaryColor: string): Theme => {
  return {
    config: {
      initialColorModeName: 'light',
    },
    colors: {
      ...lightTheme,
      primary: primaryColor,
      modes: {
        dark: { ...darkTheme, primary: primaryColor },
        light: { ...lightTheme },
      },
    },
  };
};
