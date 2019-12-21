import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import { Typography, Divider } from '@material-ui/core';

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <Typography style={{ fontWeight: 700 }}>{text}</Typography>,
    [MARKS.ITALIC]: (text: string) => (
      <Typography style={{ fontStyle: 'italic' }}>{text}</Typography>
    ),
    [MARKS.UNDERLINE]: (text: string) => (
      <Typography style={{ textDecoration: 'underline' }}>{text}</Typography>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: string) => (
      <Typography paragraph>{children}</Typography>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: string) => (
      <Typography gutterBottom variant="h1">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: string) => (
      <Typography gutterBottom variant="h2">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: string) => (
      <Typography gutterBottom variant="h3">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: string) => (
      <Typography gutterBottom variant="h4">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: string) => (
      <Typography gutterBottom variant="h5">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: string) => (
      <Typography gutterBottom variant="h6">
        {children}
      </Typography>
    ),
    [BLOCKS.HR]: () => <Divider style={{ marginBottom: '16px' }} />,
  },
};

const RichText: React.FC<{ source: { json: any } }> = ({ source }) => (
  <>{documentToReactComponents(source.json, options)}</>
);

export default RichText;
