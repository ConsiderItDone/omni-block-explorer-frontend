import { useMemo } from 'react';
import { useThemeUI, ThemeUIStyleObject } from 'theme-ui';

export const useStyles = () => {
  const { theme: themeUI } = useThemeUI();

  const styles = useMemo(() => {
    return <ThemeUIStyleObject>{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      color: 'text',
      '.graphiql-container': {
        color: 'text',
        minHeight: '650px',
        '.topBar': {
          background: 'transparent',
          height: 'fit-content',
        },
        '.docExplorerShow': {
          background: 'transparent',
          color: 'text',
          borderLeft: 'none',
          '::before': {
            borderColor: 'text',
          },
        },
        '.editor-drag-bar': {
          background: 'transparent',
          borderRight: 'none',
        },
        '.CodeMirror': {
          background: 'transparent !important',
        },
        '.CodeMirror-gutters': {
          background: 'transparent !important',
          borderRight: 'none',
        },
        '.secondary-editor-title': {
          background: 'transparent',
          '.variable-editor-title-text': {
            color: 'text',
          },
        },
        '.resultWrap': {
          '.CodeMirror': {
            '.CodeMirror-gutters': {
              background: 'transparent',
            },
          },
        },
        '.docExplorerWrap': {
          background: 'window-dark',
          border: '1px solid ',
          borderColor: 'gray',
          '.doc-explorer, .doc-explorer-contents': {
            background: 'window-dark',
          },
          '.doc-explorer-title-bar': {
            alignItems: 'center',
            '.doc-explorer-title': { overflow: 'none' },
            '.docExplorerHide': {
              color: 'text',
            },
          },
          '.doc-explorer-contents': {
            borderTop: 'none',
            '.search-box': {
              input: {
                background: 'transparent',
                color: 'text',
              },
            },
          },
        },
      },
      '.panel': {
        bg: 'window-dark',
        width: '100%',
        borderRadius: '24px',
        p: '26px 32px 32px',
        h3: {
          fontSize: '24px',
          color: 'text',
          lineHeight: '32px',
          mb: 0,
        },
        h4: {
          color: 'gray',
        },
        '.head': {
          display: 'flex',
          justifyContent: 'space-between',
          mb: '32px',
        },
      },
      '.networkData': {
        '.head': {
          mb: '28px',
          '.status': {
            pb: '4px',
          },
        },
        '.body': {
          display: 'flex',
          gap: '21px',
          '.logo-wrap': {
            width: '72px',
            height: '72px',
            img: {
              width: '100%',
              height: 'auto',
            },
          },
          '.content': {
            width: '100%',
            '.stats': {
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              paddingBottom: '24px',
              borderColor: 'gray',
            },
            '.data': {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '24px',
              paddingTop: '24px',
            },
          },
        },
      },
      '.playground': {
        '.body': {
          '>div.ant-tabs': {
            padding: '0 !important',
            m: '0 !important',
            '.ant-tabs-nav': {
              mb: 0,
            },
          },
        },
      },
      '.logDate': {
        opacity: 0.5,
        margin: 0,
      },
      '.logStatusLevel': {
        width: '55px',
        height: '24px',
        borderRadius: '70px',
        color: 'white',
        textAlign: 'center',
      },
      'div[data-status-level="error"]':{
        backgroundColor: '#E40C5B',
      },
      'div[data-status-level="warn"]':{
        backgroundColor: '#FFE45A',
      },
      'div[data-status-level="info"]':{
        backgroundColor: '#5A81FF',
      },
      'div[data-status-level="debug"]':{
        backgroundColor: '#844DFF',
      },
      '.blocks':{
        position: 'relative'
      },
      '.filterHeader': {
        position: 'absolute',
        top: '-29px',
        right: '0px',
        zIndex: '5',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        '[data-filter="false"]': {
          color: 'black',
          opacity: '0.5',
        },
        '.ant-input-wrapper': {
          border: '1px solid #27333f',
          borderRadius: '8px',
        },
        '.ant-input-group-addon': {
          backgroundColor: 'transparent',
          borderTopRightRadius: '8px',
          borderBottomRightRadius: '8px',
          overflow: 'hidden',
          height: '100%',
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
        '.ant-input-search-button *': { color: themeUI.colors.text },
        'button': {
          border: 'none',
          marginX: '5px',
        }
      }
    }
  }, [themeUI])

  return styles;
};
