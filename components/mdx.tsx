import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import { Box } from './Box';
import { Link } from './Link';
import { Typography } from './Typography';

export const components = {
  Box: ({ css, ...props }: any) => <Box css={css} {...props} />,
  h1: (props) => (
    <Typography kind="h2" as="h2" css={{ mt: '$1', mb: '$3' }} {...props} />
  ),
  h2: (props) => (
    <Typography kind="h3" as="h3" css={{ mt: '$1', mb: '$2' }} {...props} />
  ),
  h3: (props) => (
    <Typography kind="h4" as="h4" css={{ mt: '$1', mb: '$1' }} {...props} />
  ),
  h4: (props) => <Typography kind="h4" as="h5" css={{ my: '0' }} {...props} />,
  p: (props) => <Typography kind="p1" css={{ mb: '$1' }} {...props} />,
  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return <Link href={href} target="_blank" rel="noopener" {...props} />;
    }

    return (
      <NextLink href={href} passHref>
        <Link {...props} />
      </NextLink>
    );
  },
  Image: ({ children, ...props }) => (
    <Box as="figure" css={{ my: '$3' }}>
      <NextImage {...(props as any)} />
      {children && (
        <Box
          as="figcaption"
          css={{
            textAlign: 'center',
            fontSize: '$1',
            lineHeight: 1,
            color: '$black',
            opacity: 0.8,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  ),
  img: ({ children, ...props }) => (
    <Box css={{ my: '$5', mx: '-$3', '@bp1': { mx: '-$5' } }}>
      <NextImage {...(props as any)} />
    </Box>
  ),
  video: (props) => (
    <Box
      css={{
        my: '$4',
        mx: '-$3',
        border: '1px solid $gray',
        overflow: 'hidden',
        '@bp1': { mx: '-$5' },
      }}
    >
      <Box
        as="video"
        {...props}
        autoPlay
        playsInline
        muted
        loop
        css={{ width: '100%', display: 'block' }}
      />
    </Box>
  ),
  iframe: ({ ...props }) => (
    <Box css={{ mb: '$4' }}>
      <iframe {...props} />
    </Box>
  ),
  blockquote: (props) => (
    <Box
      as="blockquote"
      css={{
        my: '$1',
        mx: '$1',
        pl: '$1',
        borderLeft: '2px solid $gray',
      }}
      {...props}
    />
  ),
};
