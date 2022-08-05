import { useMemo } from 'react';
import { useThemeUI, ThemeUIStyleObject } from 'theme-ui';

export const useStyles = () => {
  const { theme: themeUI } = useThemeUI();

  const styles = useMemo(() => {
    return <ThemeUIStyleObject>{
      '.custom_table.block .head': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      '.custom_table.block .head .primary': {
        color: 'gray',
        marginBottom: '25px',
      },
      '.custom_table.block .head .primary h3': {
        color: 'gray',
        fontWeight: 500,
        lineHeight: '24px',
      },
      '.custom_table.block .head .primary h1': { color: themeUI.colors.text },
      '.custom_table.block .head .secondary': {
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
        marginBottom: '20px',
      },
      '.custom_table.block .head .secondary >div': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      },
      '.custom_table.block .head .secondary >div >div:first-child': {
        color: 'gray',
      },
      '.custom_table.block .body': {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
      '.custom_table.block .body >div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '50%',
        padding: '14px 0 20px',
      },
      '@media (max-width: 576px)': [
        {
          '.custom_table.block .body >div': {
            width: '100%',
            padding: '12px 0 19px !important',
          },
        },
        {
          '.custom_table.block .body >div:nth-child(1),\n  .custom_table.block .body >div:nth-child(2)': {
            borderTop: 'none',
          },
          '.custom_table.block .body >div': { borderBottom: '1px solid #27333f' },
          '.custom_table.block .body >div:last-child': { borderBottom: 'none' },
        },
      ],
      '.custom_table.block .body >div .primary,\n.custom_table.block .body >div .secondary': {
        width: '100%',
      },
      '.custom_table.block .body >div .primary,\n.custom_table.block .body >div .secondary,\n.custom_table.block .body >div .secondary>a':
        {
          fontSize: '16px',
        },
      '.custom_table.block .body >div .primary': { color: 'gray' },
      '.custom_table.block .body >div .secondary': {
        color: themeUI.colors.text,
        wordBreak: 'break-all',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      },
      '.custom_table.block .body >div a': { display: 'block' },
      '.custom_table.block .body >div:nth-child(odd)': { paddingRight: '5%' },
      '.custom_table.block .body >div:nth-child(even)': { paddingLeft: '5%' },
      '.custom_table.block .body >div:nth-child(1),\n.custom_table.block .body >div:nth-child(2)': {
        borderTop: '1px solid #27333f',
        borderBottom: '1px solid #27333f',
      },
    };
  }, [themeUI]);

  return styles;
};
