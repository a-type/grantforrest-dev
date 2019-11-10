import * as React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
// @ts-ignore
import clientConfig from '../../clientConfig';

export default ({ node }: { node: any }) => {
  const fluidProps = getFluidGatsbyImage(node.asset._id, { maxWidth: 675 }, clientConfig.sanity);
  return (
    <figure>
      <Img fluid={fluidProps} alt={node.alt} />
      <figcaption>{node.caption}</figcaption>
    </figure>
  );
};
