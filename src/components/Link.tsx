import * as React from 'react';
import { Link as MuiLink } from '@material-ui/core';
import { Link as GatsbyLink } from 'gatsby';

const RelaxedMuiLink = MuiLink as any;

const Link = React.forwardRef<any, any>(({ to, ...props }, ref) => {
  if (to.startsWith('http')) {
    return <MuiLink href={to} target="_blank" rel="noopener" {...props} />;
  }

  return <RelaxedMuiLink component={GatsbyLink} ref={ref} to={to} {...props} />;
});

export default Link;
