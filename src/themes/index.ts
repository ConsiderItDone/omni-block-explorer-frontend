import { Theme } from 'theme-ui';
import darkTheme from './dark';

export const getTheme = (primaryColor: string): Theme => {
  return { ...darkTheme, colors: Object.assign({}, darkTheme.colors, { primary: primaryColor }) };
};
