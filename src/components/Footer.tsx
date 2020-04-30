import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import Link from './Link';

export interface FooterProps {}

const useStyles = makeStyles(theme => ({
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
    fontSize: theme.typography.pxToRem(14),
  },
}));

const Footer: React.FC<FooterProps> = () => {
  const styles = useStyles({});

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          &copy; {new Date().getFullYear()}, Built with{' '}
          <Link to="https://www.gatsbyjs.org">Gatsby</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
