import * as React from 'react';
import Header from './Header';
import { MuiThemeProvider, makeStyles, CssBaseline } from '@material-ui/core';
import theme from '../themes/light';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';

const useStyles = makeStyles(theme => ({
  content: {
    minHeight: 'calc(100% - 73px - 120px)',

    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100% - 91px - 155px)',
    },
  },
  footer: {},
  footerWrapper: {
    boxSizing: 'border-box',
    maxWidth: '960px',
    padding: '4.5em 1.5em 1.5em',
    margin: '0 auto',

    [theme.breakpoints.up('sm')]: {
      padding: '6em 2em 2em',
    },
  },
  siteInfo: {
    textAlign: 'center',
    fontSize: '12px',
  },
}));

const Layout: React.FC = ({ children }) => {
  const styles = useStyles({});

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${withPrefix('/')}img/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix('/')}img/favicon-16x16.png`}
            sizes="16x16"
          />

          <meta name="theme-color" content="#fff" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Helmet>
        <Header />
        <div className={styles.content}>{children}</div>
        <footer className={styles.footer}>
          <div className={styles.footerWrapper}>
            <div className={styles.siteInfo}>
              &copy; {new Date().getFullYear()}, Built with{' '}
              <a href="https://www.sanity.io">Sanity</a> &amp;
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </div>
          </div>
        </footer>
      </MuiThemeProvider>
    </>
  );
};

export default Layout;
