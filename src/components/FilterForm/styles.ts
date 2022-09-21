import { useMemo } from 'react';
import { useThemeUI, ThemeUIStyleObject } from 'theme-ui';

export const useStyles = () => {
  const { theme: themeUI } = useThemeUI();

  const styles = useMemo(() => {
    return {
      filterForm: <ThemeUIStyleObject>{
        fontWeight: 600,
        width: '100%',
        h2: {
          color: themeUI.colors.text,
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
        },
        '.base': {
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        },
        '.row': { display: 'flex', gap: '6px' },
        '.ant-input': {
          height: '42px',
          width: '100%',
          borderRadius: '8px',
        },
        '.ant-picker': {
          height: '42px',
          width: '185px',
          backgroundColor: 'transparent',
          borderRadius: '8px',
          border: '1px solid #27333f',
        },
        '.ant-picker:hover': { border: '1px solid', borderColor: 'primary' },
        '.ant-picker .ant-picker-input input': { color: themeUI.colors.text },
        '.ant-picker-focused': {
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'primary',
        },
        '.ant-picker-suffix': { color: themeUI.colors.text },
        '.ant-picker-clear': {
          backgroundColor: '$window-dark',
          color: themeUI.colors.text,
        },
        '.ant-input-group': { width: 'fit-content' },
        '.ant-form-item-label': { display: 'flex' },
        '.ant-form-item-label label': {
          color: themeUI.colors.text,
          alignSelf: 'center',
        },
        '.ant-select': { width: '160px' },
        '.ant-select .ant-select-selector': {
          height: '40px',
          backgroundColor: 'transparent',
          border: '1px solid #27333f',
          borderRadius: '8px',
          color: themeUI.colors.text,
          fontWeight: 600,
          padding: '9px 16px',
        },
        '@media (max-width: 576px)': {
          '.ant-select .ant-select-selector': { height: '48px' },
        },
        '.ant-select .ant-select-selector .ant-select-selection-item': {
          alignSelf: 'center',
        },
        '.ant-select .ant-select-selector .ant-select-selection-item::before': {
          marginRight: '8px',
        },
        '.ant-select .ant-select-arrow': { color: 'gray' },
        '.label-event .ant-select-selection-item:before,\n.label-module .ant-select-selection-item:before,\n.label-call .ant-select-selection-item:before,\n.label-sign .ant-select-selection-item:before':
          {
            color: 'gray',
          },
        '.label-call .ant-select-selection-item:before': { content: "'Call '" },
        '.label-sign .ant-select-selection-item:before': { content: "'Sign '" },
        '.label-module .ant-select-selection-item:before': { content: "'Module '" },
        '.label-event .ant-select-selection-item:before': { content: "'Event '" },
      },
      closeBtn: { marginBottom: '16px' },
      filterMobile: <ThemeUIStyleObject>{
        color: themeUI.colors.text,
        backgroundColor: '$window-dark',
        position: 'fixed',
        padding: '32px 16px',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100%',
        transform: 'translateY(-100%)',
        transition: '0.3s transform',
        zIndex: 100,
        '.ant-form .ant-btn': { width: '100%' },
        '.ant-form .ant-btn span': { margin: '0 auto' },
        '&.active': {
          transform: 'translateY(0)',
          overscrollBehavior: 'contain',
          '@media (max-width: 576px)': {
            '.ant-form-item': { height: '48px' },
          },
          '.ant-select.ant-select-single.ant-select-show-arrow': {
            width: '100%',
          },
          '.ant-picker': { width: '100%', height: '48px' },
          '.ant-form-item': { marginBottom: '16px' },
          '.ant-input,\n&.active .ant-btn': {
            height: '48px',
          },
        },
      },
    };
  }, [themeUI]);

  return styles;
};
