import { useColors } from '@clouds/colors';
import { BlogCard } from '@components/BlogCard';
import { Box } from '@components/Box';
import { Link } from '@components/Link';
import { Typography } from '@components/Typography';
import { getAllFrontmatter } from '@lib/mdx';
import React, { useEffect } from 'react';
import { Frontmatter } from 'types/post';

export default function Home({ posts }: { posts: Frontmatter[] }) {
  useEffect(() => {
    useColors.getState().setTheme('day');
  }, []);

  return (
    <Box
      css={{
        padding: '$4',
        position: 'relative',
        width: '100%',
      }}
    >
      <Box css={{ maxWidth: 900 }}>
        <Typography kind="h1" as="h1" css={{ mb: '$2' }}>
          Grant Forrest
        </Typography>
        <Typography kind="p1" css={{ mb: '$1' }}>
          I'm constantly making things. I prefer to make pretty stuff you can
          click on. Sometimes I get in a mood and make invisible stuff that runs
          on a box somewhere instead. What really gets me onboard is if it's
          never been done before.
        </Typography>
        <Typography kind="p1" css={{ mb: '$1' }}>
          Today I work at{' '}
          <Link href="https://twitter.com/withhq">With Labs</Link> as a senior
          full-stack developer. You can find the whole story{' '}
          <Link href="https://timeline.gfor.rest">here</Link>.
        </Typography>
        <Typography kind="p1" css={{ mb: '$1' }}>
          In my personal life, I write down my thoughts about life, faith, and
          ideals. If you're interested in that, I publish{' '}
          <Link href="https://temporarymountains.substack.com/publish?utm_source=menu">
            here
          </Link>
          .
        </Typography>
        <Box
          css={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gridGap: '$3',
            mt: '$2',
          }}
        >
          {posts.map((postData) => (
            <BlogCard
              key={postData.slug || postData.title}
              frontmatter={postData}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function getStaticProps() {
  let posts = getAllFrontmatter();

  // filter out drafts in prod
  if (process.env.NODE_ENV === 'production') {
    posts = posts.filter((post) => !post.draft);
  }

  return { props: { posts } };
}
