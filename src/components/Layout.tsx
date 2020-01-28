import * as React from 'react';
import Header from './Header';
import { MuiThemeProvider, makeStyles, CssBaseline, Link } from '@material-ui/core';
import theme from '../themes/base';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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

const Layout: React.FC<{ stickyHeader?: boolean }> = ({ children, stickyHeader = false }) => {
  const styles = useStyles({});

  return (
    <div className={styles.app}>
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
            href="https://fonts.googleapis.com/css?family=Roboto:200,400,400i,700&display=swap"
          />
        </Helmet>
        <Header sticky={stickyHeader} />
        <div className={styles.content}>{children}</div>
        <footer className={styles.footer}>
          <div className={styles.footerWrapper}>
            <div className={styles.siteInfo}>
              &copy; {new Date().getFullYear()}, Built with{' '}
              <Link href="https://www.gatsbyjs.org">Gatsby</Link>
            </div>
          </div>
        </footer>
      </MuiThemeProvider>
    </div>
  );
};

export default Layout;
