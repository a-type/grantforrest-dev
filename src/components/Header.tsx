import * as React from 'react';
import Link from './Link';
import { Link as MuiLink, IconButton } from '@material-ui/core';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import GithubIcon from './GithubIcon';
import DarkModeToggle from './DarkModeToggle';

const useStyles = makeStyles(theme => ({
  titleArea: {
    flexGrow: 1,
  },
  title: {
    textTransform: 'none',
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

const Header: React.FC<{ sticky?: boolean; noTitle?: boolean }> = ({ sticky, noTitle }) => {
  const classes = useStyles({});

  return (
    <AppBar position={sticky ? 'fixed' : 'absolute'} color="inherit" className={classes.appBar}>
      <Toolbar>
        <div className={classes.titleArea} style={{ visibility: !!noTitle ? 'hidden' : 'visible' }}>
          <Button
            component={Link}
            to="/"
            className={classes.title}
            color="inherit"
            underline="none"
          >
            <Typography variant="h6">Grant Forrest</Typography>
          </Button>
        </div>
        <Button component={Link} to="/blog" color="inherit" underline="never">
          Blog
        </Button>
        <DarkModeToggle />
        <IconButton
          color="inherit"
          component={MuiLink}
          href="https://github.com/a-type"
          target="_blank"
          rel="noopener"
        >
          <GithubIcon className={classes.githubIcon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
