import * as React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  figure: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  image: {
    maxHeight: '60vh',
    width: 'auto',
    objectFit: 'contain',
  },
  caption: {
    marginTop: theme.spacing(1),
  },
}));

export default ({
  node,
}: {
  node: { fluid: FluidObject; description?: string; caption?: string };
}) => {
  const classes = useStyles({ node });
  return (
    <figure className={classes.figure}>
      <Img
        fluid={node.fluid}
        alt={node.description}
        className={classes.image}
        imgStyle={{ objectFit: 'contain' }}
      />
      {node.caption && (
        <Typography component="figcaption" variant="caption" className={classes.caption}>
          {node.caption}
        </Typography>
      )}
    </figure>
  );
};
