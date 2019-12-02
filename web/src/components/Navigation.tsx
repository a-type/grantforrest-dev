import * as React from 'react';
import Link from './Link';
import { Link as MuiLink, IconButton } from '@material-ui/core';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { getPortfolioUrl } from '../lib/helpers';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr 1fr',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateAreas: '"_0 portfolioLabel" "home portfolio" "blog _1"',
    gridGap: theme.spacing(1),
  },
  portfolio: {
    display: 'flex',
    flexDirection: 'row',
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  portfolioLabel: {
    fontSize: theme.typography.pxToRem(12),
    marginLeft: theme.spacing(1),
  },
}));

type NavigationProps = {
  className?: string;
  firstTwoPortfolioProjects: {
    slug: {
      current: string;
    };
    title: string;
    publishedAt: Date;
    id: string;
    _rawExcerpt: any;
  }[];
};

const Navigation: React.FC<NavigationProps> = ({ firstTwoPortfolioProjects, ...rest }) => {
  const classes = useStyles({});

  return (
    <div {...rest} className={clsx(classes.root, rest.className)}>
      <Typography style={{ gridArea: 'portfolioLabel' }} className={classes.portfolioLabel}>
        Portfolio
      </Typography>
      <Link to="/" color="inherit" style={{ gridArea: 'home' }}>
        <Button>Home</Button>
      </Link>
      <div style={{ gridArea: 'portfolio' }} className={classes.portfolio}>
        {firstTwoPortfolioProjects.map(({ slug, id, publishedAt, title }) => (
          <Link key={id} underline="none" to={getPortfolioUrl(publishedAt, slug)}>
            <Button>{title}</Button>
          </Link>
        ))}
      </div>
      <Link to="/archives" color="inherit" underline="none" style={{ gridArea: 'blog' }}>
        <Button>Blog</Button>
      </Link>
    </div>
  );
};

export default Navigation;
