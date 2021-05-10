import React from 'react';
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

export default function PostPage({ frontmatter, code }: Post) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  const twitterShare = `
	https://twitter.com/intent/tweet?
	text="${frontmatter.title}" by @gaforres
	&url=https://grantforrest.dev/${CONTENT_PATH}/${frontmatter.slug}
	`;

  return (
    <div
      className={box({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <TitleAndMetaTags description={frontmatter.title} />

      <div
        className={container({
          css: {
            mx: '$4',
            p: '$4',
            bc: '$white',
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
        <div className={box({ mb: '$5', '@bp1': { mb: '$6' } })}>
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
        </div>

        <h1
          className={text({
            size: '9',
            role: 'title',
            css: { display: 'flex', alignItems: 'center' },
          })}
        >
          {frontmatter.title}{' '}
          {frontmatter.draft && (
            <span className={box({ variant: 'white', css: { ml: '$2' } })}>
              Draft
            </span>
          )}
        </h1>

        <time
          className={text({
            size: '2',
            css: { mt: '$1', mx: 'auto', fontFamily: '$mono', color: '$gray' },
          })}
        >
          {format(parseISO(frontmatter.publishedAt), 'MMMM dd, yyyy')}
          {/* —{' '}{frontmatter.readingTime.text} */}
        </time>

        <div className={box({ my: '$5' })}>
          <Component components={components as any} />
        </div>

        <hr />

        <div className={box({ mb: '$5' })}>
          <p className={text({ size: '2' })}>
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
        </div>
      </div>
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
