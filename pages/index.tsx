import { BlogCard } from '@components/BlogCard';
import { getAllFrontmatter } from '@lib/mdx';
import { container } from '@styles/container';
import React from 'react';
import { Frontmatter } from 'types/post';

export default function Home({ posts }: { posts: Frontmatter[] }) {
  return (
    <>
      <div
        className={container({ css: { mx: 'auto', mb: '$3', bc: 'white' } })}
      >
        Hello world.
        <div>
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
