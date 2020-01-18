import * as React from 'react';
import Link from './Link';
import { Link as MuiLink, IconButton } from '@material-ui/core';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import GithubIcon from './GithubIcon';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
    background: 'transparent',
    color: theme.palette.primary.main,
  },
  githubIcon: {
    width: '24px',
    height: '24px',
    color: 'inherit',
  },
}));

const Header: React.FC<{ sticky?: boolean }> = ({ sticky = false }) => {
  const classes = useStyles({});

  return (
    <AppBar position={sticky ? 'fixed' : 'absolute'} color="inherit" className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.title} color="inherit">
          <Typography variant="h6">Grant Forrest</Typography>
        </Link>
        <Button component={Link} to="/portfolio" color="inherit" underline="never">
          Portfolio
        </Button>
        <Button component={Link} to="/blog" color="inherit" underline="never">
          Blog
        </Button>
        <MuiLink href="https://github.com/a-type" color="inherit" target="_blank" rel="noopener">
          <IconButton color="inherit">
            <GithubIcon className={classes.githubIcon} />
          </IconButton>
        </MuiLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
