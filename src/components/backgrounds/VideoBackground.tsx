import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { useDarkMode } from '../../contexts/DarkModeContext';

export interface VideoBackgroundProps {
  sources: string[];
  posterSource: string;
  type: string;
}

const useStyles = makeStyles<Theme, VideoBackgroundProps>((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '100%',
    maxWidth: '150vmin',
    height: '100vmin',
    transform: 'translateX(-50%)',
    objectFit: 'cover',
    WebkitMaskImage: 'url(/img/feather-mask.svg)',
  },
  filterLark: {
    // smaller sizes are darker to contrast better
    filter: `contrast(0.6) contrast(1.2) brightness(0.6) saturate(1.1)`,
    // [theme.breakpoints.up('md')]: {
    //   filter: `contrast(0.6) contrast(1.2) brightness(0.6)`,
    // },
  },
  filterLarkInverted: {
    // smaller sizes are darker to contrast better
    filter: `brightness(0.6) contrast(0.8) invert() hue-rotate(210deg) grayscale(0.7)`,
    [theme.breakpoints.up('md')]: {
      filter: `brightness(0.8) contrast(0.8) invert() hue-rotate(210deg) grayscale(0.7)`,
    },
  },
}));

const VideoBackground = React.forwardRef<HTMLDivElement, VideoBackgroundProps>((props, ref) => {
  const { sources, posterSource, type } = props;
  const classes = useStyles(props);

  const { dark } = useDarkMode();

  return (
    <div className={classes.root} ref={ref}>
      <video
        className={clsx(classes.video, dark ? classes.filterLark : classes.filterLarkInverted)}
        id="wp"
        autoPlay
        muted
        loop
        playsInline
        poster={posterSource}
      >
        {sources.map((source) => (
          <source key={source} src={source} type={type} />
        ))}
      </video>
    </div>
  );
});

export default VideoBackground;
