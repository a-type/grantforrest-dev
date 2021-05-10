import React from 'react';
import NextLink from 'next/link';
import { parseISO, format } from 'date-fns';
import type { Post } from 'types/post';
import { text } from '@styles/text';
import { box } from '@styles/box';
import { link } from '@styles/link';
import { CONTENT_PATH } from '@constants/paths';

export const BlogCard = ({ frontmatter, ...props }: Post) => {
  return (
    <div className={box({ mt: '$4' })} {...props}>
      <NextLink href={`${CONTENT_PATH}/${frontmatter.slug}`} passHref>
        <a
          className={link({
            css: {
              display: 'inline-block',
              lineHeight: '$3',
            },
          })}
          aria-label={`Read ${frontmatter.title}`}
        >
          <span
            className={text({
              size: 4,
              css: { display: 'flex', alignItems: 'center' },
            })}
          >
            {frontmatter.title}{' '}
            {frontmatter.draft && (
              <span className={box({ css: { ml: '$2' } })}>Draft</span>
            )}
          </span>

          {frontmatter.publishedAt && (
            <time
              className={text({
                size: 2,
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
    </div>
  );
};
