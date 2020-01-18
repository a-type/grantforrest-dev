import { createMuiTheme, Theme } from '@material-ui/core/styles';
import palette from './palettes/light';

const defaultTheme = createMuiTheme({
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontSize: 16,
  },
  palette,
});

const { breakpoints } = defaultTheme;

const theme: Theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '4rem',
        [breakpoints.down('xs')]: {
          fontSize: '3rem',
        },
        '&$gutterBottom': {
          marginBottom: defaultTheme.spacing(2),
        },
      },
      h2: {
        opacity: 0.75,
        fontWeight: 200,
        fontSize: '3rem',
        [breakpoints.down('xs')]: {
          fontSize: '2rem',
        },
        '&$gutterBottom': {
          marginBottom: defaultTheme.spacing(2),
        },
      },
      h3: {
        '&$gutterBottom': {
          marginBottom: defaultTheme.spacing(2),
        },
      },
      h4: {
        '&$gutterBottom': {
          marginBottom: defaultTheme.spacing(2),
        },
      },
      paragraph: {
        lineHeight: 1.5,
      },
      gutterBottom: {
        marginBottom: defaultTheme.spacing(5),
      },
    },
  },
};

export default theme;
