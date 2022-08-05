import { ThemeUIStyleObject } from 'theme-ui';

export default {
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
} as ThemeUIStyleObject;
