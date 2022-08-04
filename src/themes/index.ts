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
      modes: {
        dark: darkTheme,
      },
    },
  };
};
