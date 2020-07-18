import * as React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';

export type PostTitleProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles<Theme, PostTitleProps>((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
}));

export function PostTitle(props: PostTitleProps) {
  const classes = useStyles(props);
  const { children } = props;

  return (
    <Typography variant="h1" className={classes.root}>
      {children}
    </Typography>
  );
}
