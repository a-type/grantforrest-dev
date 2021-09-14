import { BlogCard } from '@components/BlogCard';
import { Box } from '@components/Box';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { Typography } from '@components/Typography';
import { getAllFrontmatter } from '@lib/mdx';
import NextLink from 'next/link';
import React from 'react';

import type { Frontmatter } from 'types/post';

export default function Blog({ posts }: { posts: Frontmatter[] }) {
  return (
    <div>
      <TitleAndMetaTags description="Blog articles about design systems, jamstack and design–dev collaboration." />

      <Box
        css={{
          mx: '$4',
          py: '$4',
          '@bp1': {
            mx: '$5',
            py: '$5',
          },
          '@bp2': {
            mx: '$6',
          },
        }}
      >
        <Box
          css={{
            mb: '$5',
            '@bp1': {
              mb: '$6',
            },
          }}
        >
          <NextLink href="/" passHref>
            <a>
              <Typography
                css={{
                  role: 'body',
                  css: { textTransform: 'uppercase' },
                }}
              >
                Home
              </Typography>
            </a>
          </NextLink>
        </Box>

        <Typography kind="h2">Blog</Typography>

        {posts.map((frontmatter) => (
          <BlogCard key={frontmatter.title} frontmatter={frontmatter} />
        ))}
      </Box>
    </div>
  );
}

export function getStaticProps() {
  const posts = getAllFrontmatter();
  return { props: { posts } };
}
