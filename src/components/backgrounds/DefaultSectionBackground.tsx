import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export type DefaultSectionBackgroundProps = {};

const useStyles = makeStyles<Theme, DefaultSectionBackgroundProps>((theme) => ({
  root: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
}));

export const DefaultSectionBackground = React.forwardRef<
  HTMLDivElement,
  DefaultSectionBackgroundProps
>((props, ref) => {
  const classes = useStyles(props);

  return <div className={classes.root} ref={ref} />;
});
