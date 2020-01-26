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
};

export default light;
