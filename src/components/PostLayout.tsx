import * as React from 'react';
import { makeStyles, Theme, Box } from '@material-ui/core';
import clsx from 'clsx';

export type PostLayoutProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const useStyles = makeStyles<Theme, PostLayoutProps>((theme) => ({
  root: {
    '& a:not([role="button"])': {
      color: theme.palette.text.primary,
    },
  },
}));

export function PostLayout(props: PostLayoutProps) {
  const classes = useStyles(props);
  const { children, className, ...rest } = props;

  return (
    <Box mb={4} mt={8} className={clsx(classes.root, className)} {...rest}>
      {children}
    </Box>
  );
}
