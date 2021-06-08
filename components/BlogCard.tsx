import React from 'react';
import NextLink from 'next/link';
import { parseISO, format } from 'date-fns';
import type { Post } from 'types/post';
import { text } from '@styles/text';
import { box } from '@styles/box';
import { link } from '@styles/link';
import { CONTENT_PATH } from '@constants/paths';
import { GridBox } from './GridBox';

export const BlogCard = ({ frontmatter, ...props }: Post) => {
  return (
    <GridBox
      outlined
      padded
      className={box({
        mb: '$2',
      })}
      {...props}
    >
      <NextLink href={`${CONTENT_PATH}/${frontmatter.slug}`} passHref>
        <a
          className={link({
            css: {
              display: 'inline-block',
              lineHeight: '$3',
            },
          })}
        >
          <span
            className={text({
              size: 3,
              gutter: 1,
              css: { display: 'flex', alignItems: 'center' },
            })}
          >
            {frontmatter.title}{' '}
            {frontmatter.draft && (
              <span className={box({ css: { ml: '$1' } })}>Draft</span>
            )}
          </span>

          {frontmatter.publishedAt && (
            <time
              className={text({
                size: 1,
                css: {
                  fontFamily: '$mono',
                  color: '$gray',
                },
              })}
            >
              {(() => {
                try {
                  return format(
                    parseISO(frontmatter.publishedAt),
                    'MMMM dd, yyyy',
                  );
                } catch (err) {
                  return '';
                }
              })()}
            </time>
          )}
        </a>
      </NextLink>
    </GridBox>
  );
};
