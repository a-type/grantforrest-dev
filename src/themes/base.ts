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

const headingStyles = {
  fontFamily: '"Roboto", sans-serif',
  fontWeight: 200,
  lineHeight: 1.2,
  '&$gutterBottom': {
    marginBottom: defaultTheme.spacing(2),
  },
};

const theme: Theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '4rem',
        color: defaultTheme.palette.primary.main,
        [breakpoints.down('xs')]: {
          fontSize: '3rem',
        },
        ...headingStyles,
      },
      h2: {
        opacity: 0.75,
        fontWeight: 200,
        fontSize: '3rem',
        [breakpoints.down('xs')]: {
          fontSize: '2rem',
        },
        ...headingStyles,
      },
      h3: {
        ...headingStyles,
      },
      h4: {
        ...headingStyles,
      },
      paragraph: {
        lineHeight: 1.5,
        marginBottom: defaultTheme.spacing(4),
      },
      gutterBottom: {
        marginBottom: defaultTheme.spacing(5),
      },
    },
  },
};

export default theme;
