import { ThemeUIStyleObject } from 'theme-ui';

export default <ThemeUIStyleObject>{
  padding: '23px 33px 33px',
  '@media (max-width: 768px)': {
    padding: '14px 16px 26px',
    '.head .primary': { gap: '0' },
    '.head .primary >div:first-child': {
      paddingRight: '16px',
    },
    '.head .primary h3': { marginBottom: '0' },
    '.head .primary h2,\n  .custom_table.extrinsic .head .primary a': {
      fontSize: '24px',
      lineHeight: '32px',
    },
    '.head .secondary': { flexDirection: 'column' },
  },
  '.head': {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  '.head .primary': {
    display: 'flex',
    gap: '30px',
    marginBottom: '40px',
  },
  '@media (max-width: 1024px)': {
    '.head .primary': {
      width: '100%',
      marginBottom: '20px',
    },
  },
  '.head .primary >div:first-child': {
    paddingRight: '30px',
    borderRight: '1px solid #27333f',
  },
  '.head .primary >div:last-child': {
    padding: '0 16px',
  },
  '.head .primary h3': {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    color: 'gray',
  },
  '.head .primary h2,\n.head .primary a': {
    color: '#fff',
    fontSize: '32px',
    lineHeight: '40px',
  },
  '.head .secondary': { display: 'flex', gap: '20px' },
  '.head .secondary >div': {
    display: 'flex',
    gap: '10px',
  },
  '.head .secondary >div >div:first-child': {
    color: 'gray',
  },
  '.body': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
  },
  '.body >div': {
    display: 'flex',
    flexDirection: 'column',
  },
  '.body >div .primary': { color: 'gray' },
  '.body >div .secondary': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '10px',
    wordBreak: 'break-all',
  },
};
