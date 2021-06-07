import React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { box } from '@styles/box';
import { text } from '@styles/text';
import { link } from '@styles/link';
import { container } from '@styles/container';

export const components = {
  Box: ({ css, as: Comp = 'div', ...props }: any) => (
    <Comp className={box(css)} {...props} />
  ),
  Container: ({ css, as: Comp = 'div', ...props }: any) => (
    <Comp className={container(css)} {...props} />
  ),
  h1: (props) => (
    <h1
      className={text({ size: 5, gutter: 3, css: { mb: '$5' } })}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className={text({
        size: 4,
        gutter: 2,
        css: { mb: '$4', mt: '$5', mx: 'auto' },
      })}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className={text({
        size: 3,
        gutter: 2,
        css: { mb: '$3', mt: '$5', mx: 'auto', fontWeight: 'bold' },
      })}
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className={text({
        size: 3,
        gutter: 1,
        css: { mb: '$3', mt: '$4', mx: 'auto', textTransform: 'uppercase' },
      })}
      {...props}
    />
  ),
  p: (props) => <p className={text({ size: 2, gutter: 1 })} {...props} />,
  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return (
        <a
          className={link()}
          href={href}
          target="_blank"
          rel="noopener"
          {...props}
        />
      );
    }

    return (
      <NextLink href={href} passHref>
        <a className={link()} {...props} />
      </NextLink>
    );
  },
  Image: ({ children, ...props }) => (
    <figure className={box({ my: '$5', mx: '-$3', '@bp1': { mx: '-$5' } })}>
      <NextImage {...(props as any)} />
      {children && (
        <figcaption
          className={box({
            textAlign: 'center',
            fontSize: '$1',
            lineHeight: 1,
            color: '$gray',
          })}
        >
          {children}
        </figcaption>
      )}
    </figure>
  ),
  img: ({ children, ...props }) => (
    <div className={box({ my: '$5', mx: '-$3', '@bp1': { mx: '-$5' } })}>
      <NextImage {...(props as any)} />
    </div>
  ),
  video: (props) => (
    <div
      className={box({
        my: '$4',
        mx: '-$3',
        border: '1px solid $gray',
        overflow: 'hidden',
        '@bp1': { mx: '-$5' },
      })}
    >
      <video
        {...props}
        autoPlay
        playsInline
        muted
        loop
        className={box({ width: '100%', display: 'block' })}
      ></video>
    </div>
  ),
  iframe: ({ ...props }) => (
    <div className={box({ mb: '$4' })}>
      <iframe {...props} />
    </div>
  ),
  blockquote: (props) => (
    <blockquote
      className={box({
        my: '$4',
        pl: '$2',
        borderLeft: '2px solid $gray',
        color: '$gray',
        '@bp1': {
          pl: '$4',
        },
      })}
      {...props}
    />
  ),
};
