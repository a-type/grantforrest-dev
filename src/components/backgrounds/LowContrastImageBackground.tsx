import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import GatsbyImage from 'gatsby-image';
import { FluidImageMedia } from '../../types';

export type LowContrastImageBackgroundProps = {
  image: FluidImageMedia | null;
};

const useStyles = makeStyles<Theme, LowContrastImageBackgroundProps>((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '100%',
    maxWidth: '150vmin',
    height: '100vmin',
    transform: 'translateX(-50%)',
    objectFit: 'cover',
    WebkitMaskImage: 'url(/img/feather-mask.svg)',
    filter: `saturate(0) contrast(2)`,
    opacity: 0.02,
  },
}));

export function LowContrastImageBackground(props: LowContrastImageBackgroundProps) {
  const classes = useStyles(props);
  const { image } = props;

  return (
    <div className={classes.root}>
      {image && <GatsbyImage className={classes.image} fluid={image.fluid} />}
    </div>
  );
}
