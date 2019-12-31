import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import { Typography, Divider } from '@material-ui/core';
import Link from './Link';

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <span style={{ fontWeight: 700 }}>{text}</span>,
    [MARKS.ITALIC]: (text: string) => <span style={{ fontStyle: 'italic' }}>{text}</span>,
    [MARKS.UNDERLINE]: (text: string) => (
      <span style={{ textDecoration: 'underline' }}>{text}</span>
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
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, description, file } = node.data.target.fields;
      const mimeType = file['en-US'].contentType;
      const mimeGroup = mimeType.split('/')[0];

      switch (mimeGroup) {
        case 'image':
          // TODO: image lightboxing
          return (
            <img
              title={title ? title['en-US'] : null}
              alt={description ? description['en-US'] : null}
              src={file['en-US'].url}
              style={{ maxWidth: '100%' }}
            />
          );
        case 'application':
          return (
            <Link href={file['en-US'].url}>
              {title ? title['en-US'] : file['en-US'].details.fileName}
            </Link>
          );
        default:
          return (
            <span style={{ backgroundColor: 'red', color: 'white' }}>
              {' '}
              &gt;Unsupported {mimeType} embedded asset&lt;{' '}
            </span>
          );
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      return <div>This post contains an embedded entry and I just haven't done that yet</div>;
    },
  },
};

const RichText: React.FC<{ source: { json: any } }> = ({ source }) => (
  <>{documentToReactComponents(source.json, options)}</>
);

export default RichText;
