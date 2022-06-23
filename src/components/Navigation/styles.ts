import { ThemeUIStyleObject } from 'theme-ui';

export default {
  burger: <ThemeUIStyleObject>{
    display: ['none', 'flex'],
    marginRight: '16px',
    padding: '15px !important',
    height: '48px !important',
    width: '48px !important',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '>div': {
      height: '2px',
      width: '16px',
      backgroundColor: 'primary',
    },
  },
  'nav.mobile': {
    padding: '40px',
    backgroundColor: '$window-dark',
    height: '100%',
    maxWidth: '360px',
    width: '100%',
    '@media (max-width: 576px)': { 'nav.mobile': { maxWidth: '425px' } },
  },
  navigation: <ThemeUIStyleObject>{
    padding: '40px',
    '.logo': { marginBottom: '60px' },
    '.logo img': { maxWidth: '118px' },
    '.nav_menu': { maxWidth: '150px' },
    '.nav_menu .divider': {
      borderBottom: '1px solid #27333f',
      margin: '18px auto',
    },
    '.nav_menu .nav_header': {
      color: '#fff',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
    },
    '@media (max-width: 576px)': {
      '.nav_menu .nav_header': { fontWeight: 500 },
    },
    '.nav_menu .nav_header.active': { color: 'primary' },
    '.nav_menu .nav_list': { listStyleType: 'none' },
    '.nav_menu .nav_list .nav_item': {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
      marginBottom: '8px',
    },
    '.nav_menu .nav_list .nav_item a': { color: 'gray' },
    '.nav_menu .nav_list .nav_item a.active': { color: 'primary' },
  },
};
