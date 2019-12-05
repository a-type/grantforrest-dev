import * as React from 'react';
import Link from './Link';
import { Link as MuiLink, IconButton } from '@material-ui/core';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { getPortfolioUrl, getBlogUrl } from '../lib/helpers';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateAreas: '"_0 portfolioLabel blogLabel" "home portfolio blog"',
    gridGap: theme.spacing(1),
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  postsLabel: {
    fontSize: theme.typography.pxToRem(12),
    marginLeft: theme.spacing(1),
  },
  linkButton: {
    textAlign: 'left',
    minWidth: 0,
    textTransform: 'capitalize',
  },
}));

type NavigationProps = {
  className?: string;
  projects: {
    slug: {
      current: string;
    };
    title: string;
    publishedAt: Date;
    id: string;
    _rawExcerpt: any;
  }[];
  blogPosts: {
    slug: {
      current: string;
    };
    title: string;
    publishedAt: Date;
    id: string;
    _rawExcerpt: any;
  }[];
};

const Navigation: React.FC<NavigationProps> = ({ projects, blogPosts, ...rest }) => {
  const classes = useStyles({});

  return (
    <div {...rest} className={clsx(classes.root, rest.className)}>
      <Typography style={{ gridArea: 'portfolioLabel' }} className={classes.postsLabel}>
        Portfolio
      </Typography>
      <Typography style={{ gridArea: 'blogLabel' }} className={classes.postsLabel}>
        Blog
      </Typography>
      <Link to="/" color="inherit" style={{ gridArea: 'home' }}>
        <Button className={classes.linkButton}>Home</Button>
      </Link>
      <div style={{ gridArea: 'portfolio' }} className={classes.postList}>
        {projects.map(({ slug, id, publishedAt, title }) => (
          <Link key={id} underline="none" to={getPortfolioUrl(publishedAt, slug)}>
            <Button className={classes.linkButton}>{title}</Button>
          </Link>
        ))}
        <Link underline="none" to="/portfolio">
          <Button className={classes.linkButton}>All</Button>
        </Link>
      </div>
      <div style={{ gridArea: 'blog' }} className={classes.postList}>
        {blogPosts.map(({ slug, id, publishedAt, title }) => (
          <Link key={id} underline="none" to={getBlogUrl(publishedAt, slug)}>
            <Button className={classes.linkButton}>{title}</Button>
          </Link>
        ))}
        <Link to="/archives" color="inherit" underline="none" style={{ gridArea: 'blog' }}>
          <Button className={classes.linkButton}>All</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
