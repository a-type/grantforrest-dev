import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllFrontmatter, getMdxBySlug } from '@lib/mdx';
import { parseISO, format } from 'date-fns';
import TitleAndMetaTags from '@components/TitleAndMetaTags';
import { components } from '@components/mdx';
import type { Post } from 'types/post';
import { text } from '@styles/text';
import { box } from '@styles/box';
import { container } from '@styles/container';
import { link } from '@styles/link';
import { CONTENT_PATH } from '@constants/paths';
import { GridBox } from '@components/GridBox';
import { GridText } from '@components/GridText';
import { useArt } from '@components/ArtCanvas';

export default function PostPage({ frontmatter, code }: Post) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  const twitterShare = `
	https://twitter.com/intent/tweet?
	text="${frontmatter.title}" by @gaforres
	&url=https://grantforrest.dev/${CONTENT_PATH}/${frontmatter.slug}
	`;

  const { load } = useArt();
  useEffect(() => {
    if (!frontmatter.image) return;
    load(frontmatter.image);
  }, [frontmatter.image, load]);

  return (
    <div className={container({})}>
      <TitleAndMetaTags description={frontmatter.title} />

      <GridText className={box({ mb: '$2', p: '$1' })}>
        <NextLink href="/" passHref>
          <a className={link({})}>
            <span
              className={text({
                size: '2',
                css: { textTransform: 'uppercase' },
              })}
            >
              Home
            </span>
          </a>
        </NextLink>
      </GridText>

      <GridText>
        <h1
          className={text({
            size: '6',
          })}
        >
          {frontmatter.title}{' '}
          {frontmatter.draft && (
            <span className={box({ variant: 'white', css: { ml: '$2' } })}>
              Draft
            </span>
          )}
        </h1>
      </GridText>

      <GridText>
        <time
          className={text({
            size: '1',
            css: { my: '$1', mx: 'auto', fontFamily: '$mono', color: '$gray' },
          })}
        >
          {format(parseISO(frontmatter.publishedAt), 'MMMM dd, yyyy')}
          {/* —{' '}{frontmatter.readingTime.text} */}
        </time>
      </GridText>

      <GridBox padded className={box({ my: '$5' })}>
        <Component components={components as any} />
      </GridBox>

      <GridBox className={box({ mb: '$5' })}>
        <p className={text({ size: '1' })}>
          Share this post on{' '}
          <a
            className={link()}
            href={twitterShare}
            target="_blank"
            title="Share this post on Twitter"
          >
            Twitter
          </a>
        </p>
      </GridBox>
    </div>
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
