import * as React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { ProjectPreviewData, BlogPostPreviewData } from '../fragments';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  linkButton: {
    minWidth: 0,
    textTransform: 'capitalize',
    fontSize: '10vmin',
  },
}));

type NavigationProps = {
  className?: string;
  projects: ProjectPreviewData[];
  blogPosts: BlogPostPreviewData[];
};

const Navigation: React.FC<NavigationProps> = ({ projects, blogPosts, ...rest }) => {
  const classes = useStyles({});

  const scrollToIdHandler = (id: string) => () => {
    const el = document.getElementById(id);
    if (!el) {
      console.error(`No element ${id}`);
    }
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  return (
    <div {...rest} className={clsx(classes.root, rest.className)}>
      <Button color="primary" className={classes.linkButton} onClick={scrollToIdHandler('about')}>
        About
      </Button>
      <Button color="primary" className={classes.linkButton} onClick={scrollToIdHandler('work')}>
        Work
      </Button>
    </div>
  );
};

export default Navigation;
