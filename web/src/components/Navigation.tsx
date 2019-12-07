import * as React from 'react';
import Link from './Link';
import { Link as MuiLink, IconButton } from '@material-ui/core';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { getPortfolioUrl, getBlogUrl } from '../lib/helpers';
import clsx from 'clsx';
import { ProjectPreviewData, BlogPostPreviewData } from '../pages';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateAreas: '"portfolioLabel blogLabel" "portfolio blog"',
    gridGap: theme.spacing(1),
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
      marginRight: 'auto',
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
  projects: ProjectPreviewData[];
  blogPosts: BlogPostPreviewData[];
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
      <div style={{ gridArea: 'portfolio' }} className={classes.postList}>
        {projects.map(({ slug, id, publishedAt, title }) => (
          <Button
            className={classes.linkButton}
            component={Link}
            key={id}
            underline="none"
            to={getPortfolioUrl(publishedAt, slug)}
          >
            {title}
          </Button>
        ))}
        <Button className={classes.linkButton} component={Link} underline="none" to="/portfolio">
          All
        </Button>
      </div>
      <div style={{ gridArea: 'blog' }} className={classes.postList}>
        {blogPosts.map(({ slug, id, publishedAt, title }) => (
          <Button
            className={classes.linkButton}
            component={Link}
            key={id}
            underline="none"
            to={getBlogUrl(publishedAt, slug)}
          >
            {title}
          </Button>
        ))}
        <Button
          className={classes.linkButton}
          component={Link}
          to="/archives"
          color="inherit"
          underline="none"
          style={{ gridArea: 'blog' }}
        >
          All
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
