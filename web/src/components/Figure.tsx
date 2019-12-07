import * as React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
// @ts-ignore
import clientConfig from '../../clientConfig';
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

export default ({ node }: { node: any }) => {
  const classes = useStyles({ node });
  const fluidProps = getFluidGatsbyImage(node.asset._id, { maxWidth: 675 }, clientConfig.sanity);
  return (
    <figure className={classes.figure}>
      <Img fluid={fluidProps} alt={node.alt} className={classes.image} />
      <Typography component="figcaption" variant="caption" className={classes.caption}>
        {node.caption}
      </Typography>
    </figure>
  );
};
