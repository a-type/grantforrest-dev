import * as React from 'react';
import { makeStyles, Theme, Box, Typography } from '@material-ui/core';
import { Previewable } from '../types';
import { PreviewCard } from './PreviewCard';

export type AdjacentPostsProps = {
  next?: Previewable;
  prev?: Previewable;
};

const useStyles = makeStyles<Theme, AdjacentPostsProps>((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    display: 'grid',
    gridTemplateAreas: '"next" "prev"',
    gridGap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      gridGap: theme.spacing(4),
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: '"prev next"',
    },
  },
  next: {
    gridArea: 'next',
  },
  prev: {
    gridArea: 'prev',
  },
  cardTitle: {
    fontSize: '1.2em',
  },
}));

export function AdjacentPosts(props: AdjacentPostsProps) {
  const classes = useStyles(props);
  const { prev, next } = props;

  return (
    <Box className={classes.root}>
      {prev && (
        <Box className={classes.prev}>
          <Typography className={classes.cardTitle} gutterBottom>
            Previous post
          </Typography>
          <PreviewCard previewable={prev} />
        </Box>
      )}
      {next && (
        <Box className={classes.next}>
          <Typography className={classes.cardTitle} gutterBottom>
            Next post
          </Typography>
          <PreviewCard previewable={next} />
        </Box>
      )}
    </Box>
  );
}
