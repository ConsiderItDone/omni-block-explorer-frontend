import { useMemo } from 'react';
import { useThemeUI, ThemeUIStyleObject } from 'theme-ui';

export const useStyles = () => {
  const { theme: themeUI } = useThemeUI();

  const styles = useMemo(() => {
    return <ThemeUIStyleObject>{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 0 32px 0',
      h2: {
        fontSize: ['normal', '32px'],
        lineHeight: '40px',
        margin: '0',
        marginRight: 'auto',
        'text-transform': 'capitalize',
        color: themeUI.colors.text,
      },
      '@media (max-width: 768px)': {
        h2: { fontSize: '24px', lineHeight: '32px' },
      },
      '.search-btn': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48px !important',
        width: '48px !important',
      },
      '.back-btn': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48px !important',
        width: '48px !important',
        marginRight: '16px',
      },
    };
  }, [themeUI]);

  return styles;
};
