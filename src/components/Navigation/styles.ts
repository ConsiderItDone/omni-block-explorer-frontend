import { useMemo } from 'react';
import { useThemeUI, ThemeUIStyleObject } from 'theme-ui';

export const useStyles = () => {
  const { theme: themeUI } = useThemeUI();

  const styles = useMemo(() => {
    const shared = {
      a: { color: 'inherit' },
      '.nav_menu': { maxWidth: '150px' },
      '.nav_menu .divider': {
        borderBottom: '1px solid #27333f',
        margin: '18px auto',
      },
      '.nav_menu .nav_header': {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '24px',
      },
      '@media (max-width: 576px)': {
        '.nav_menu .nav_header': { fontWeight: 500 },
      },
      '.nav_menu .nav_header.active': { color: themeUI.colors.primary },
      '.nav_menu .nav_list': { listStyleType: 'none' },
      '.nav_menu .nav_list .nav_item': {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '24px',
        marginBottom: '8px',
      },
      '.nav_menu .nav_list .nav_item a': { color: themeUI.colors.gray },
      '.nav_menu .nav_list .nav_item a.active': { color: themeUI.colors.primary },
    };
    return {
      navigation: <ThemeUIStyleObject>{
        position: 'relative',
        padding: '40px',
        '.logo': { marginBottom: '60px' },
        '.logo img': { maxWidth: '118px' },

        '.nav_header_title': { color: themeUI.colors.text },
        '.bottom_logo': { position: 'absolute', bottom: '40px' },
        ...shared,
      },
      burger: <ThemeUIStyleObject>{
        display: ['flex'],
        marginRight: '16px',
        padding: '15px !important',
        height: '48px !important',
        width: '48px !important',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '>div': {
          height: '2px',
          width: '16px',
          backgroundColor: themeUI.colors.primary,
        },
      },
      mobileNav: {
        padding: '40px',
        backgroundColor: 'window-dark',
        height: '100%',
        maxWidth: '360px',
        width: '100%',
        '@media (max-width: 576px)': { '&': { maxWidth: '425px' } },
        ...shared,
      },
    };
  }, [themeUI]);

  return styles;
};
