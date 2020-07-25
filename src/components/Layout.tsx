import * as React from 'react';
import Header from './Header';
import { makeStyles, CssBaseline, Link } from '@material-ui/core';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import { lightTheme, darkTheme } from '../themes/theme';
import { useDarkMode, DarkModeProvider } from '../contexts/DarkModeContext';
import { ThemeProvider } from '@material-ui/core/styles';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
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
}));

function InnerLayout({ children }: { children?: React.ReactNode }) {
  const { dark } = useDarkMode();

  return <ThemeProvider theme={dark ? darkTheme : lightTheme}>{children}</ThemeProvider>;
}

const Layout: React.FC<{
  stickyHeader?: boolean;
  noTitle?: boolean;
  forceDarkMode?: 'dark' | 'light';
  style?: React.CSSProperties;
}> = ({ children, stickyHeader = false, noTitle = false, forceDarkMode, style }) => {
  const styles = useStyles({});

  return (
    <DarkModeProvider force={forceDarkMode && forceDarkMode === 'dark'}>
      <InnerLayout>
        <div className={styles.app} style={style}>
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
              href="https://fonts.googleapis.com/css2?family=EB+Garamond&family=Montserrat:wght@300&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <Header sticky={stickyHeader} noTitle={noTitle} noDarkModeToggle={!!forceDarkMode} />
          <div className={styles.content}>{children}</div>
          <Footer />
        </div>
      </InnerLayout>
    </DarkModeProvider>
  );
};

export default Layout;
