import { createMuiTheme, Theme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  shape: {
    borderRadius: 24,
  },
});

const { breakpoints } = defaultTheme;

const theme: Theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '5rem',
        [breakpoints.down('xs')]: {
          fontSize: '3rem',
        },
      },
    },
  },
};

export default theme;
