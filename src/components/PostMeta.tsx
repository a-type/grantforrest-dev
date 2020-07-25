import * as React from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core';
import { format, distanceInWords, differenceInDays } from 'date-fns';
import Link from './Link';

export type PostMetaProps = {
  createdAt?: string;
  homepageUrl?: string;
  postType?: string;
};

const useStyles = makeStyles<Theme, PostMetaProps>((theme) => ({
  root: {
    alignSelf: 'start',
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  createdAt: {
    opacity: 0.5,
  },
}));

export function PostMeta(props: PostMetaProps) {
  const classes = useStyles(props);
  const { createdAt, homepageUrl, postType = 'Project' } = props;

  return (
    <aside className={classes.root}>
      {createdAt && (
        <div className={classes.createdAt}>
          {differenceInDays(new Date(createdAt), new Date()) > 3
            ? distanceInWords(new Date(createdAt), new Date())
            : format(new Date(createdAt), 'MMMM Do, YYYY')}
        </div>
      )}
      {homepageUrl && (
        <Button underline="none" variant="contained" component={Link} to={homepageUrl}>
          View {postType}
        </Button>
      )}
    </aside>
  );
}
