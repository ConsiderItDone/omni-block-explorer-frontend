import { ThemeUIStyleObject } from 'theme-ui';

const styles: ThemeUIStyleObject = {
  '.overlay_bg': {
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(black, 0)',
    transition: '0.5s all',
    zIndex: '-10',
    '>*': {
      width: '100%',
      height: '100%',
      transform: 'translateX(-100%)',
      transition: '.3s transform',
    },
  },
  '&.active': {
    '.overlay_bg': {
      backgroundColor: 'rgba(black, 0.4)',
      zIndex: ' 100',
      '>*': {
        transform: 'translateX(0)',
      },
    },
  },
};

export default styles;
