import { BlogCard } from '@components/BlogCard';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { getAllFrontmatter } from '@lib/mdx';
import { box } from '@styles/box';
import { container } from '@styles/container';
import { link } from '@styles/link';
import { text } from '@styles/text';
import NextLink from 'next/link';
import React from 'react';

import type { Frontmatter } from 'types/post';

export default function Blog({ posts }: { posts: Frontmatter[] }) {
  return (
    <div>
      <TitleAndMetaTags description="Blog articles about design systems, jamstack and design–dev collaboration." />

      <div
        className={container({
          css: {
            mx: '$4',
            py: '$4',
            '@bp1': {
              mx: '$5',
              py: '$5',
            },
            '@bp2': {
              mx: '$6',
            },
          },
        })}
      >
        <div
          className={box({
            mb: '$5',
            '@bp1': {
              mb: '$6',
            },
          })}
        >
          <NextLink href="/" passHref>
            <a className={link({})}>
              <span
                className={text({
                  role: 'body',
                  css: { textTransform: 'uppercase' },
                })}
              >
                Home
              </span>
            </a>
          </NextLink>
        </div>

        <h1
          className={text({
            role: 'title',
            size: '7',
            css: { mb: '$5', mx: 'auto' },
          })}
        >
          Blog
        </h1>

        {posts.map((frontmatter) => (
          <BlogCard key={frontmatter.title} frontmatter={frontmatter} />
        ))}
      </div>
    </div>
  );
}

export function getStaticProps() {
  const posts = getAllFrontmatter();
  return { props: { posts } };
}
