import { createMuiTheme, Theme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontSize: 16,
  },
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
      },
      paragraph: {
        lineHeight: 1.5,
      },
    },
  },
};

export default theme;
