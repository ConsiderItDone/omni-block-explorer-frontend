import { ThemeUIStyleObject } from 'theme-ui';

export default {
  search: {
    maxWidth: '310px',
    transition: '1s all',
    '.ant-input-wrapper': {
      height: '48px',
      padding: '0 17px',
      paddingRight: '0',
      display: 'flex',
      alignItems: 'center',
    },
    '.ant-input-wrapper,\n.search input': {
      border: '1px solid #27333f',
      borderRadius: '8px',
    },
    '.ant-input-wrapper input,\n.search input input': {
      padding: '0',
      backgroundColor: 'transparent',
      color: '#fff',
    },
    '.ant-input-wrapper input::placeholder,\n.search input input::placeholder': {
      color: '#878d94',
    },
    '.ant-input-group-addon': {
      backgroundColor: 'transparent',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      maxWidth: '48px',
    },
    '.ant-input-group-addon .ant-btn': {
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    },
    '.ant-input-group-addon .ant-btn:active,\n.ant-input-group-addon .ant-btn:focus': {
      border: 'none',
      backgroundColor: 'transparent',
    },
    '.ant-input-group-addon .ant-btn:hover': {
      backgroundColor: 'transparent',
    },
    '.ant-input-search-button': {
      height: '100%',
      border: 'none !important',
      borderRadius: '8px',
      backgroundColor: 'transparent',
    },
    '.ant-input-search-button *': { color: '#fff' },
    '.ant-input-search-button:after,\n.ant-input-search-button:before': {
      display: 'none',
    },
  },
  searchMobile: <ThemeUIStyleObject>{
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'translateY(-100%)',
    transition: '0.3s transform',
    width: 'calc(100% - 32px)',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    padding: '40px 16px',
    backgroundColor: '$window-dark',
    borderBottomRightRadius: '24px',
    borderBottomLeftRadius: '24px',
    borderRadius: '24px',
    margin: '0 16px',
    '.active': { transform: 'translateY(16px)' },
    '.ant-input-wrapper.ant-input-group': { height: '100%' },
    '.ant-input-wrapper,\n.search-mobile input': {
      border: '1px solid #27333f',
      borderRadius: '8px',
    },
    '.ant-input-group-addon': {
      backgroundColor: 'transparent',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      overflow: 'hidden',
      height: '100%',
      maxWidth: '48px',
    },
    '.ant-input-group-addon .ant-btn': {
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    },
    '.ant-input-group-addon .ant-btn:active,\n.ant-input-group-addon .ant-btn:focus': {
      border: 'none',
      backgroundColor: 'transparent',
    },
    '.ant-input-group-addon .ant-btn:hover': {
      backgroundColor: 'transparent',
    },
    '.ant-input-search-button': {
      height: '100%',
      border: 'none !important',
      borderRadius: '8px',
      backgroundColor: 'transparent',
    },
    '.ant-input-search-button *': { color: '#fff' },
    '.ant-input-search-button:after,\n.ant-input-search-button:before': {
      display: 'none',
    },
  },
};
