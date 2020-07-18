import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { format, distanceInWords, differenceInDays } from 'date-fns';

export type PostMetaProps = {
  createdAt?: string;
};

const useStyles = makeStyles<Theme, PostMetaProps>((theme) => ({
  root: {
    alignSelf: 'start',
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  createdAt: {
    opacity: 0.5,
  },
}));

export function PostMeta(props: PostMetaProps) {
  const classes = useStyles(props);
  const { createdAt } = props;

  return (
    <aside className={classes.root}>
      {createdAt && (
        <div className={classes.createdAt}>
          {differenceInDays(new Date(createdAt), new Date()) > 3
            ? distanceInWords(new Date(createdAt), new Date())
            : format(new Date(createdAt), 'MMMM Do, YYYY')}
        </div>
      )}
    </aside>
  );
}
