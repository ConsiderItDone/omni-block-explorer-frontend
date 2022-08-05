import { useMemo } from 'react';
import { useThemeUI, ThemeUIStyleObject } from 'theme-ui';

export const useStyles = () => {
  const { theme: themeUI } = useThemeUI();

  const styles = useMemo(() => {
    return <ThemeUIStyleObject>{
      backgroundColor: 'window-dark',
      padding: '28px 32px 30px',
      borderRadius: '24px',

      '@media (max-width: 1439px)': { padding: '2% 3%' },
      '@media (max-width: 991px)': { width: '100%' },
      '@media (max-width: 576px)': {
        padding: '21px 16px 28px',
        '.ant-table-title h3': {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 500,
        },

        '.table_title h2': { fontSize: '16px !important' },
      },
      '.ant-table-title': { padding: '0', marginBottom: '20px' },
      '.ant-table-title h3': {
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '30px',
        margin: '0',
        color: themeUI.colors.text,
        '.addon': {
          color: 'gray',
        },
      },
      '.ant-table': { backgroundColor: 'window-dark' },
      '.ant-table .ant-table-container td': {
        fontFamily: "'Inter'",
      },
      '.ant-table .ant-table-cell': {
        borderBottom: '1px solid #27333f',
        padding: '11px 9px 13px !important',
      },
      '.ant-table .ant-table-cell .cell-secondary': {
        fontSize: '12px',
        lineHeight: '18px',
        color: 'gray',
      },
      '.ant-table .ant-table-cell:first-child': {
        paddingLeft: '0 !important',
      },
      '.ant-table .ant-table-cell:last-child': {
        paddingRight: '0 !important',
      },
      '.ant-table th.ant-table-cell': {
        backgroundColor: 'window-dark',
        fontSize: '12px',
        lineHeight: '18px',
        color: 'gray',
        fontWeight: 'normal',
      },
      'thead.ant-table-thead tr th.ant-table-cell': {
        paddingBottom: '9px !important',
      },
      'tbody.ant-table-tbody .ant-table-row .ant-table-cell': {
        color: themeUI.colors.text,
      },
      'tbody.ant-table-tbody .ant-table-row .ant-table-cell a': {
        color: themeUI.colors.text,
      },
      'tbody.ant-table-tbody .ant-table-row:last-child .ant-table-cell': {
        border: 'none',
        paddingBottom: '0 !important',
      },
      'tbody.ant-table-tbody .ant-table-row:hover': {
        backgroundColor: 'none !important',
      },
      'tbody.ant-table-tbody .ant-table-row:hover .ant-table-cell': {
        backgroundColor: 'inherit',
      },
      '.ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover': {
        backgroundColor: 'inherit',
      },
      '.table_title': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      '.table_title .ant-form-item': { height: '40px' },
      '.table_title .ant-form-item button': { height: '40px' },
      '.ant-pagination': { marginTop: '24px !important' },
      '.ant-pagination .ant-pagination-jump-prev,\n.ant-pagination .ant-pagination-jump-next': {
        border: `1px solid ${themeUI.colors.text}`,
      },
      '.ant-pagination .ant-pagination-jump-prev .ant-pagination-item-ellipsis,\n.ant-pagination .ant-pagination-jump-next .ant-pagination-item-ellipsis':
        {
          color: themeUI.colors.text,
        },
      '.ant-pagination .ant-pagination-jump-prev .ant-pagination-item-ellipsis:hover,\n.ant-pagination .ant-pagination-jump-next .ant-pagination-item-ellipsis:hover':
        {
          color: 'primary',
        },
      '.ant-pagination .ant-pagination-options': { display: 'none' },
      '.ant-pagination li,\n.ant-pagination li>button.ant-pagination-item-link,\n.ant-pagination li>a': {
        backgroundColor: 'window-dark',
        color: themeUI.colors.text,
      },
      '.ant-pagination li:hover,\n.ant-pagination li>button.ant-pagination-item-link:hover,\n.ant-pagination li>a:hover':
        {
          color: 'primary',
          borderColor: 'primary',
        },
      '.ant-pagination .ant-pagination-item-active': { borderColor: 'primary' },
      '.ant-pagination .ant-pagination-item-active>*': { color: 'primary' },
      '.ant-table-placeholder .ant-table-cell:hover': {
        backgroundColor: '#000 !important',
      },
      '.ant-table-placeholder .ant-empty': { color: themeUI.colors.text },
      '.cell-secondary.combined-2': {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '16px',
        width: '100%',
      },
      '.cell-secondary.combined-2 >div': { width: 'calc(50% - 8px)' },
    };
  }, [themeUI]);

  return styles;
};
