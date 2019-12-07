import * as React from 'react';
import Link from './Link';
import { Link as MuiLink, IconButton } from '@material-ui/core';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import githubIcon from '../img/github-icon.svg';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
    background: 'transparent',
  },
  githubIcon: {
    width: '24px',
    height: '24px',
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
        <Link className="navbar-item" to="/archive" color="inherit">
          <Button color="inherit">Blog</Button>
        </Link>
        <MuiLink href="https://github.com/a-type" color="inherit" target="_blank" rel="noopener">
          <IconButton color="inherit">
            <img src={githubIcon} className={classes.githubIcon} />
          </IconButton>
        </MuiLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
