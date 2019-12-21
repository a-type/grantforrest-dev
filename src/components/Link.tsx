import * as React from 'react';
import { Link as MuiLink } from '@material-ui/core';
import { Link as GatsbyLink } from 'gatsby';

const RelaxedMuiLink = MuiLink as any;

const Link = React.forwardRef<any, any>((props, ref) => (
  <RelaxedMuiLink component={GatsbyLink} ref={ref} {...props} />
));

export default Link;
