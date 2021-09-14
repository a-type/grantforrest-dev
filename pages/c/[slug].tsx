import { useColors } from '@clouds/colors';
import { Box } from '@components/Box';
import { Link } from '@components/Link';
import { components } from '@components/mdx';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { Typography } from '@components/Typography';
import { CONTENT_PATH } from '@constants/paths';
import { getAllFrontmatter, getMdxBySlug } from '@lib/mdx';
import { format, parseISO } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import NextLink from 'next/link';
import React, { useEffect } from 'react';

import type { Post } from 'types/post';
export default function PostPage({ frontmatter, code }: Post) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  useEffect(() => {
    useColors.getState().setTheme(frontmatter.theme ?? 'day');
  }, [frontmatter.theme]);

  const twitterShare = `
	https://twitter.com/intent/tweet?
	text="${frontmatter.title}" by @gaforres
	&url=https://grantforrest.dev/${CONTENT_PATH}/${frontmatter.slug}
	`;

  return (
    <Box
      css={{
        position: 'relative',
        p: '$4',
      }}
    >
      <TitleAndMetaTags description={frontmatter.title} />

      <NextLink href="/" passHref>
        <Link>
          <Typography
            kind="h4"
            css={{
              textTransform: 'uppercase',
            }}
          >
            Home
          </Typography>
        </Link>
      </NextLink>

      <Typography
        kind="h1"
        css={{
          mb: '$4',
        }}
      >
        {frontmatter.title}{' '}
        {frontmatter.draft && (
          <Box as="span" css={{ variant: 'white', css: { ml: '$2' } }}>
            Draft
          </Box>
        )}
      </Typography>

      <Typography
        as="time"
        css={{
          my: '$1',
          fontFamily: '$mono',
          color: '$gray',
        }}
      >
        {format(parseISO(frontmatter.publishedAt), 'MMMM dd, yyyy')}
        {/* —{' '}{frontmatter.readingTime.text} */}
      </Typography>

      <Box
        css={{
          bc: '$white',
          color: '$black',
          p: '$2',
          br: '$3',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <Component components={components as any} />
        <Typography kind="p2" css={{ mt: '$1' }}>
          Share this post on{' '}
          <Link
            href={twitterShare}
            target="_blank"
            title="Share this post on Twitter"
          >
            Twitter
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  const frontmatters = getAllFrontmatter();

  return {
    paths: frontmatters.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { frontmatter, code } = await getMdxBySlug(context.params.slug);

  return { props: { frontmatter, code } };
}
