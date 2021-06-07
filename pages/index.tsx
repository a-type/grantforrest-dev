import { BlogCard } from '@components/BlogCard';
import { GridBox } from '@components/GridBox';
import { GridText } from '@components/GridText';
import { getAllFrontmatter } from '@lib/mdx';
import { box } from '@styles/box';
import { container } from '@styles/container';
import { text } from '@styles/text';
import React from 'react';
import { Frontmatter } from 'types/post';

export default function Home({ posts }: { posts: Frontmatter[] }) {
  return (
    <>
      <div className={container({})}>
        <GridText className={box({ mb: '$3' })}>
          <h1 className={text({ size: 4 })}>Grant Forrest</h1>
        </GridText>
        {[
          '1' as const,
          '2' as const,
          '3' as const,
          '4' as const,
          '5' as const,
          '6' as const,
        ].map((size) => (
          <GridText className={box({ mb: '$2' })} outlined>
            <span className={text({ size })}>Size ${size}</span>
          </GridText>
        ))}
        <div
          className={box({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          })}
        >
          {posts.map((postData) => (
            <BlogCard
              key={postData.slug || postData.title}
              frontmatter={postData}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export function getStaticProps() {
  const posts = getAllFrontmatter();

  return { props: { posts } };
}
