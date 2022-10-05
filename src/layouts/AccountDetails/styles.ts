import { useMemo } from 'react';
import { useThemeUI, ThemeUIStyleObject } from 'theme-ui';

export const useStyles = () => {
  const { theme: themeUI } = useThemeUI();

  const styles = useMemo(() => {
    return <ThemeUIStyleObject>{
      '.account-details-wrapper section': {
        padding: '30px',
        backgroundColor: 'window-dark',
        borderRadius: '24px',
        marginBottom: '12px',
      },
      '.account-details-wrapper section span': {
        color: themeUI.colors.text,
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
      },
      '.account-details-wrapper section button span': { color: 'primary' },
      '.account-details-wrapper section button:hover span': {
        color: 'window-dark',
      },
      '@media (max-width: 576px)': [
        { '.account-details-wrapper section': { padding: '15px' } },
        { '.account-details-wrapper .info': { gap: '14px' } },
        { '.account-details-wrapper .info .props': { alignSelf: 'flex-start' } },
        {
          '.account-details-wrapper .balance h1': {
            fontSize: '32px',
            lineHeight: '40px',
          },
        },
        {
          '.account-details-wrapper .balance .rest': {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
          '.account-details-wrapper .balance .rest h2': { fontSize: '16px' },
          '.account-details-wrapper .balance .rest >div': {
            width: '100% !important',
            padding: '9px 0',
          },
          '.account-details-wrapper .balance .rest >div:first-of-type': {
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: '1px solid gray',
            borderBottom: '1px solid gray',
          },
        },
      ],
      '.account-details-wrapper .info': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '45px',
        gap: '20px',
        flexWrap: 'wrap',
      },
      '.account-details-wrapper .info .address span': { fontWeight: 500 },
      '@media (max-width: 1024px)': [
        {
          '.account-details-wrapper .info': {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
          '.account-details-wrapper .info .address': {
            wordBreak: 'break-all',
            color: themeUI.colors.text,
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 500,
            marginRight: '15px',
          },
          '.account-details-wrapper .info .address span': { marginRight: '15px' },
        },
        { '.account-details-wrapper .info .props': { display: 'flex' } },
        { '.account-details-wrapper .balance': { flexDirection: 'column' } },
        { '.account-details-wrapper .balance .rest': { alignItems: 'flex-start' } },
      ],
      '.account-details-wrapper .info .label': {
        marginRight: '5px',
        color: 'gray',
      },
      '.account-details-wrapper .info .value': { color: 'gray' },
      '.account-details-wrapper .info .props *': { fontSize: '12px' },
      '.account-details-wrapper .info .props >div': { marginRight: '30px' },
      '.account-details-wrapper .balance': {
        display: 'flex',
        justifyContent: 'space-between',
      },
      '.account-details-wrapper .balance span': {
        color: 'gray',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
      },
      '.account-details-wrapper .balance h1,\n.account-details-wrapper .balance h2': {
        color: themeUI.colors.text,
      },
      '.account-details-wrapper .balance h1': {
        fontSize: '64px',
        lineHeight: '64px',
      },
      '.account-details-wrapper .balance h2': {
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '32px',
      },
      '.account-details-wrapper .balance .free': { color: themeUI.colors.text },
      '.account-details-wrapper .balance .free h1': { wordBreak: 'break-all' },
      '.account-details-wrapper .balance .rest': {
        display: 'flex',
        alignItems: 'center',
      },
      '.account-details-wrapper .balance .rest >div::first-of-type': {
        width: 'fit-content',
        paddingRight: '35px',
        marginRight: '25px',
        borderRight: '1px solid gray',
      },
      '.account-details-wrapper .balance .rest >div h2': { marginBottom: '0' },
    };
  }, [themeUI]);

  return styles;
};
