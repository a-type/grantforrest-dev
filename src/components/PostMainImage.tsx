import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { FluidImageMedia } from '../types';
import GatsbyImage from 'gatsby-image';

export type PostMainImageProps = {
  image: FluidImageMedia;
};

const useStyles = makeStyles<Theme, PostMainImageProps>((theme) => ({
  root: {
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '40vh',
    overflow: 'hidden',

    '& img': {
      display: 'block',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      verticalAlign: 'top',
      objectFit: 'cover',
    },
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
}));

export function PostMainImage(props: PostMainImageProps) {
  const classes = useStyles(props);
  const { image } = props;

  return (
    <div className={classes.root}>
      <GatsbyImage className={classes.mainImage} fluid={image.fluid} alt={image.description} />
    </div>
  );
}
