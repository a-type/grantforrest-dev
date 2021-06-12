import { useArt } from '@components/ArtCanvas';
import { BlogCard } from '@components/BlogCard';
import { GridText } from '@components/GridText';
import { getAllFrontmatter } from '@lib/mdx';
import { box } from '@styles/box';
import { container } from '@styles/container';
import { text } from '@styles/text';
import React, { useEffect } from 'react';
import { Frontmatter } from 'types/post';

export default function Home({ posts }: { posts: Frontmatter[] }) {
  const { load } = useArt();
  useEffect(() => {
    load('/images/horseshoe.jpg');
  }, [load]);

  return (
    <div className={container({})}>
      <GridText className={box({ mb: '$3' })}>
        <h1 className={text({ size: 5 })}>Grant Forrest</h1>
      </GridText>
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
  );
}

export function getStaticProps() {
  const posts = getAllFrontmatter();

  return { props: { posts } };
}
