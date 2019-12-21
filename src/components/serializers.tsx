import * as React from 'react';
import Figure from './Figure';
import { Typography } from '@material-ui/core';
import Link from './Link';

const serializers = {
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    mainImage: Figure,
    block: ({ node, children }: any) => {
      const style = node.style || 'normal';

      switch (style) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          return (
            <Typography variant={style} gutterBottom>
              {children}
            </Typography>
          );
        case 'span':
          return <Typography>{children}</Typography>;
        default:
          return <Typography paragraph>{children}</Typography>;
      }
    },
  },
  marks: {
    link: ({ mark, children }: any) => <Link to={mark.href}>{children}</Link>,
  },
};

export default serializers;
