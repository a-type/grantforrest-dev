import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const light: ThemeOptions['palette'] = {
  type: 'light',
  action: {},
  background: {
    default: '#e2e2ea',
    paper: '#eeeeef',
  },
  primary: {
    main: '#3232a0',
  },
  secondary: {
    main: '#a0aeff',
  },
  grey: {
    50: '#f9f9fb',
    100: '#f1f1f4',
    200: '#e7e7ed',
    300: '#dddde6',
    400: '#d6d6e0',
    500: '#cfcfdb',
    600: '#cacad7',
    700: '#c3c3d2',
    800: '#bdbdcd',
    900: '#b2b2c4',
    A100: '#ffffff',
    A200: '#ffffff',
    A400: '#ffffff',
    A700: '#fcfcff',
  },
};

export default light;
