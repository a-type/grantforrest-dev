import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import GithubIcon from '../GithubIcon';

export type GithubBackgroundProps = {};

const useStyles = makeStyles<Theme, GithubBackgroundProps>((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  icon: {
    opacity: 0.2,
    position: 'absolute',
    animation: '4s quadratic infinite alternate $pulse',
    transform: 'translate(-50%, -50%)',
    width: '5vmin',
    height: '5vmin',
  },
  '@keyframes pulse': {
    from: {
      opacity: 0.05,
    },
    to: {
      opacity: 0.3,
    },
  },
}));

export const GithubBackground = React.forwardRef<HTMLDivElement, GithubBackgroundProps>(
  (props, ref) => {
    const classes = useStyles(props);
    const {} = props;

    return (
      <div className={classes.root} ref={ref}>
        {[20, 40, 60, 80].map((x, xIndex) =>
          [20, 40, 60, 80].map((y, yIndex) => (
            <GithubIcon
              key={`${x}:${y}`}
              className={classes.icon}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${xIndex + (yIndex * xIndex) / 4}s`,
              }}
            />
          )),
        )}
      </div>
    );
  },
);
