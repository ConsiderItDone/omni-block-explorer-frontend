import { ThemeUIStyleObject } from 'theme-ui';

export default <ThemeUIStyleObject>{
  '.color_schemes_wrapper': {
    width: '100%',
  },
  '.custom_color_scheme': {
    borderRadius: '24px',
    padding: '32px',
    marginBottom: '40px',
  },
  '.dark_mode': {
    background: '#0F1C2A',
  },
  '.custom_color_scheme .dark_mode_text': {
    color: 'white',
    padding: '12px',
  },
  '.custom_color_scheme .light_mode_text': {
    color: 'black',
    padding: '12px',
  },
  '.light_mode': {
    background: '#F7F7F7',
  },
  '.custom_color_scheme .mode_card': {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '.mode_label': {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '32px',
  },
};
