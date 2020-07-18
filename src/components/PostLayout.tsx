import * as React from 'react';
import { makeStyles, Theme, Box } from '@material-ui/core';

export type PostLayoutProps = {
  children?: React.ReactNode;
};

const useStyles = makeStyles<Theme, PostLayoutProps>((theme) => ({
  root: {
    '& a': {
      color: theme.palette.text.primary,
    },
  },
}));

export function PostLayout(props: PostLayoutProps) {
  const classes = useStyles(props);
  const { children } = props;

  return (
    <Box mb={4} mt={8} className={classes.root}>
      {children}
    </Box>
  );
}
