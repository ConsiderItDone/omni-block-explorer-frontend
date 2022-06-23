import { ThemeUIStyleObject } from 'theme-ui';
import extrinsicStyles from '../ExtrinsicsDetails/styles';

export default {
  transferTable: <ThemeUIStyleObject>{
    '.custom_table.transfer': {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '30px',
    },
    '.custom_table.transfer >div': {
      width: '50%',
      marginBottom: '30px',
      wordBreak: 'break-all',
    },
    '.custom_table.transfer >div .primary': { color: 'gray' },
    '.custom_table.transfer >div .secondary': { display: 'block' },
    '.custom_table.transfer >div:first-child': {
      borderRight: '1px solid #27333f',
    },
    '.custom_table.transfer >div:nth-child(2)': { paddingLeft: '30px' },
    '.custom_table.transfer >div:last-child': { marginBottom: '0' },
    '.custom_table.transfer >div >div': {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
    },
    '.custom_table.transfer >div h1.secondary': {
      color: '#fff',
      fontSize: '56px',
      lineHeight: '64px',
    },
  },
  extrinsicTable: <ThemeUIStyleObject>{
    ...extrinsicStyles,
    '@media (max-width: 768px)': {
      '.custom_table.transfer >div': { width: '100%', padding: '0' },
      '.custom_table.transfer >div:first-child': { borderRight: 'none' },
      '.custom_table.transfer >div:nth-child(2)': {
        padding: '13px 0 16px',
        borderTop: '1px solid #27333f',
        borderBottom: '1px solid #27333f',
      },

      '.custom_table.extrinsic .head .primary': {
        width: '100%',
        justifyContent: 'space-between',
      },
      '.custom_table.extrinsic .head .primary >div': { width: '50%' },
      '.custom_table.extrinsic .head .secondary': { gap: '2px' },
      '.custom_table.extrinsic .body >div': {
        width: '33%',
        padding: '13px 0 13px 15px',
      },
      '.custom_table.extrinsic .body >div:first-child': {
        width: '100%',
        marginBottom: '16px',
      },
      '.custom_table.extrinsic .body >div:nth-child(2)': { padding: '13px 0' },
    },
  },
};
