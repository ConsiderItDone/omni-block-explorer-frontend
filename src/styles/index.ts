import { Interpolation } from '@emotion/react';
import { Theme } from 'theme-ui';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const getGlobalStyles = (theme: Theme): Interpolation<Theme> => ({
  body: {
    backgroundColor: theme.colors.background,
  },
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Inter',
  },
  '.ant-spin-nested-loading': {
    '&>*': {
      borderRadius: '8px',
    },
  },
  '.layout': {
    minHeight: '100vh',
    display: 'flex',
    width: '100%',
  },
  main: {
    width: '100%',
    overflow: 'hidden',
    padding: '40px',
    marginBottom: 'auto',
    paddingBottom: '35px',
    '@media(max-width:768px)': {
      padding: '32px 16px',
    },
  },
  'g[aria-labelledby]': { display: 'none' },
  '.tabs .ant-tabs-nav:before': { borderBottom: '2px solid !important', borderColor: theme.colors.primary },
  '.tabs .ant-tabs-nav-operations .ant-tabs-nav-more': { color: theme.colors.text },
  '.tabs .ant-tabs-nav-operations .ant-tabs-nav-more:after': {
    display: 'none',
  },
  '.tooltip': { cursor: 'help' },
  '.timestamp': { overflow: 'hidden', textOverflow: 'ellipsis' },
  '.ant-spin.ant-spin-spinning': { display: 'block', margin: '0 auto' },
  '.spin-container': {
    margin: '20px 0',
    marginBottom: '20px',
    padding: '30px 50px',
    textAlign: 'center',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: '4px',
  },
  '.btn': {
    display: 'block',
    padding: '8px 16px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '20px',
  },
  '.fullWidth': { width: '100%' },
  '.ant-form-item': { height: '100%' },
  '.ant-form-item-label label': { height: '100%', color: theme.colors.text },
  '.ant-form-item-control-input,\n.ant-form-item-control-input-content': {
    height: '100%',
  },
  '.ant-input,\n.ant-input-affix-wrapper': {
    backgroundColor: 'transparent',
    border: '1px solid #27333f',
    borderRadius: '6px',
    color: theme.colors.text,
    height: '100%',
  },
  '.ant-input:hover,\n.ant-input-affix-wrapper:hover': {
    borderColor: theme.colors.primary,
  },
  '.ant-input .ant-input-prefix,\n.ant-input-affix-wrapper .ant-input-prefix': {
    color: theme.colors.gray,
  },
  '.ant-input-wrapper .ant-input': { border: 'none !important' },
  '.ant-input-wrapper .ant-input-group-addon': { borderColor: theme.colors.primary },
  '.ant-input-wrapper .ant-input-group-addon button': { paddingRight: '5px' },
  '.ant-input-wrapper:hover': { borderColor: theme.colors.primary },
  '.ant-input:focus': {
    borderColor: theme.colors.primary,
    boxShadow: 'none !important',
  },
  '.ant-input-focused': {
    borderColor: theme.colors.primary,
    boxShadow: 'none !important',
  },
  '.ant-form-inline': { alignItems: 'center' },
  '.ant-select-focused .ant-select-selector,\n.ant-select-open .ant-select-selector': {
    borderColor: `${theme.colors.primary} !important`,
    boxShadow: 'none !important',
  },
  '.ant-select:hover,\n.ant-select-selector:hover': {
    borderColor: `${theme.colors.primary} !important`,
  },
  '.ant-select:active,\n.ant-select-selector:active,\n.ant-select:focus,\n.ant-select-selector:focus': {
    borderColor: theme.colors.primary,
  },
  '.btn-dark': { backgroundColor: '#e4e8ef', color: '#000' },
  '.ant-tabs': { backgroundColor: `${theme.colors['window-dark']} !important` },
  '.ant-tabs-content-holder,\n.ant-tabs-nav': {
    backgroundColor: theme.colors['window-dark'],
  },
  '.ant-picker-dropdown .ant-picker-panel-container': {
    filter: 'drop-shadow(0px 4px 32px #000)',
    borderRadius: '8px',
    backgroundColor: 'transparent',
  },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel': {
    backgroundColor: theme.colors['window-dark'],
    boxShadow: '0px 1px 4px #000',
    borderBottom: 'none',
  },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel': {
    border: 'none',
  },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-header': {
    border: 'none',
  },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-header *': {
    color: theme.colors.text,
  },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table td':
    {
      color: theme.colors.text,
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table th':
    {
      color: theme.colors.gray,
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table .ant-picker-cell-disabled:before':
    {
      backgroundColor: 'transparent',
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table .ant-picker-cell-disabled > .ant-picker-cell-inner':
    {
      color: theme.colors.gray,
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table .ant-picker-cell-disabled > .ant-picker-cell-inner:before':
    {
      backgroundColor: 'transparent',
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table .ant-picker-cell-today > .ant-picker-cell-inner':
    {
      color: theme.colors.text,
      backgroundColor: '#27333f',
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table .ant-picker-cell-inner:before':
    {
      border: 'none !important',
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table .ant-picker-cell-selected > .ant-picker-cell-inner':
    {
      backgroundColor: theme.colors.primary,
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-date-panel .ant-picker-body table .ant-picker-cell:hover .ant-picker-cell-inner':
    {
      backgroundColor: theme.colors.gray,
    },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-footer': {
    border: 'none',
  },
  '.ant-picker-dropdown .ant-picker-panel-container .ant-picker-panel .ant-picker-footer a': {
    color: theme.colors.primary,
  },
  '.ant-btn.dark': { backgroundColor: theme.colors.primary, color: theme.colors.text },
  '.custom_table': {
    backgroundColor: theme.colors['window-dark'],
    color: theme.colors.text,
    borderRadius: '24px',
    padding: '23px 30px 12px',
  },
  '@media (max-width: 768px)': [
    { '.custom_table': { padding: '22px 17px 30px' } },
    { '.tabs': { padding: '22px 16px !important' } },
  ],
  '.ant-badge': { marginLeft: '8px', height: '18px', width: '18px' },
  '.ant-badge .ant-badge-count': {
    backgroundColor: theme.colors.primary,
    boxShadow: 'none',
    padding: '3px',
    borderRadius: '50%',
  },
  '.ant-badge .ant-badge-count .ant-scroll-number-only': { display: 'block' },
  '.ant-badge .ant-badge-count p': { lineHeight: '15px' },
  '.tabs': {
    marginTop: '40px !important',
    borderRadius: ['8px', '24px'],
    padding: '30px !important',
  },
  '.tabs .ant-tabs-nav .ant-tabs-nav-wrap': { backgroundColor: theme.colors['window-dark'] },
  '.tabs .ant-tabs-nav .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-ink-bar': {
    backgroundColor: theme.colors.primary,
  },
  '.tabs .ant-tabs-nav .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab': {
    padding: '8px 16px',
    marginLeft: '0',
  },
  '.tabs .ant-tabs-nav .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab .ant-tabs-tab-btn': {
    color: theme.colors.text,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
  },
  '.tabs .ant-tabs-nav .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab.ant-tabs-tab-active': {
    '.ant-tabs-tab-btn': {
      color: theme.colors.primary,
    },
  },
  '.tabs .ant-tabs-nav .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab .ant-tabs-tab-btn span': {
    color: theme.colors.gray,
    marginLeft: '6px',
  },
  '.tabs .ant-table-wrapper': { padding: '0' },
  '.ellipsis': { overflow: 'hidden', textOverflow: 'ellipsis' },
  '.ant-btn': {
    display: 'flex',
    height: 'fit-content',
    fontWeight: 600,
    background: 'transparent',
    borderRadius: '8px',
    border: '1px solid #27333f',
    padding: '9px 16px',
    color: theme.colors.primary,
    fontSize: '12px',
    alignItems: 'center',
  },
  '.ant-btn:hover': {
    backgroundColor: theme.colors.primary,
    color: theme.colors['window-dark'],
    border: '1px solid transparent',
  },
  '.ant-btn:active,\n.ant-btn:focus': {
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  'a.ant-btn': {
    lineHeight: '18px',
    height: '40px',
    padding: '11px 16px !important',
  },
  '.ant-popover.popover-overlay': {
    maxWidth: '100vw',
    padding: '0 8px',
    '.ant-popover-content': {
      maxWidth: '600px',
      wordBreak: 'break-all',
      borderRadius: '24px',
      overflow: 'hidden',
      '.ant-popover-inner': {
        background: '#2a3541',
        '.ant-popover-inner-content': {
          color: theme.colors.text,
        },
      },
      '.ant-popover-arrow': {
        border: '8px solid #2a3541 !important',
        bottom: '0',
        right: '40px',
        transform: 'translate(-50%, 50%) rotate(45deg)',
        '.ant-popover-arrow-content': {
          display: 'none',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
});
