import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

export type ColorBackgroundProps = {
  color: string;
};

const useStyles = makeStyles<Theme, ColorBackgroundProps>((theme) => ({
  root: (props) => ({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: props.color,
  }),
}));

export const ColorBackground = React.forwardRef<HTMLDivElement, ColorBackgroundProps>(
  (props, ref) => {
    const classes = useStyles(props);

    return <div className={classes.root} ref={ref} />;
  },
);
