import { useMemo } from 'react';
import { useThemeUI, ThemeUIStyleObject } from 'theme-ui';

export const useStyles = () => {
  const { theme: themeUI } = useThemeUI();

  const styles = useMemo(() => {
    return <ThemeUIStyleObject>{
      '.tables': {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        height: '100%',
        '.ant-table-wrapper': {
          width: 'calc(50% - 20px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          '.ant-table': {
            '.ant-table-title': {
              h3: {
                color: themeUI.colors.text,
              },
              '@media(max-width: 576px)': {
                marginBottom: '8px',
                h3: {
                  fontSize: '16px',
                  fontWeight: 500,
                },
              },
            },
          },
          '@media(max-width: 991px)': {
            width: '100%',
          },
        },
      },
      '.chainData': {
        padding: '28px 30px 28px 33px',
        borderRadius: '24px',
        marginBottom: '32px',
        backgroundColor: 'window-dark',
        '@media(max-width: 576px)': {
          padding: '21px 16px',
          marginBottom: '16px',
        },
        '*': {
          color: themeUI.colors.text,
        },
        '.title': {
          fontSize: '24px',
          lineHeight: '32px',
          marginBottom: '48px',
          fontWeight: 500,
          '@media(max-width: 576px)': {
            fontSize: '16px',
            marginBottom: '20px',
          },
        },
        'h2.title': {
          color: themeUI.colors.gray,
        },
        '.data': {
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          width: '100%',
          '>div': {
            paddingLeft: '32px',
            width: '25%',
            borderRight: '1px solid #27333F',
            '&::first-of-type': {
              padding: 0,
            },
            '&:last-of-type': {
              borderRight: 'none',
            },
          },
          h3: {
            fontSize: '32px',
            lineHeight: '40px',
            fontWeight: 'normal',
            marginBottom: 0,
            '@media(max-width: 576px)': {
              fontSize: '16px',
            },
          },
          h4: {
            color: themeUI.colors.gray,
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            marginBottom: '0',
          },
          '.separator': {
            width: '100%',
            borderBottom: '1px solid #27333f',
            marginBottom: '20px',
          },
          '@media (max-width: 576px)': [
            { '.separator': { marginBottom: '0' } },
            {
              '>div': { width: '50%', border: 'none', padding: '0 !important' },
              '>div:first-of-type,\n  >div:nth-of-type(2)': {
                marginBottom: '0',
                borderTop: '1px solid #27333f',
              },
              '>div:nth-of-type(odd)': { paddingRight: '15px' },
              '>div h4': { marginTop: '14px', marginBottom: '0' },
              '>div h3': { fontSize: '16px', lineHeight: '24px', marginBottom: '14px' },
            },
          ],
          '@media (max-width: 768px)': {
            '>div': { width: '50%', padding: '0' },
            '>div:first-of-type,\n  >div:nth-of-type(2)': { marginBottom: '20px' },
            '>div:nth-of-type(2)': { borderRight: 'none' },
            '>div:nth-of-type(2),\n  >div:nth-of-type(5)': { paddingLeft: '20px' },
          },
        },
      },
    };
  }, [themeUI]);

  return styles;
};
