import { useColors } from '@clouds/colors';
import { CONTENT_PATH } from '@constants/paths';
import { format, parseISO } from 'date-fns';
import NextLink from 'next/link';
import React from 'react';

import { Box } from './Box';
import { Link } from './Link';
import { Typography } from './Typography';

import type { Post } from 'types/post';
export const BlogCard = ({ frontmatter, ...props }: Post) => {
  const onHover = () => {
    useColors.getState().setTheme(frontmatter.theme ?? 'day');
  };

  const onHoverLeave = () => {
    useColors.getState().setTheme('day');
  };

  return (
    <NextLink href={`${CONTENT_PATH}/${frontmatter.slug}`} passHref>
      <Link
        css={{
          lineHeight: '$3',
          textDecoration: 'none',
          height: '100%',
        }}
      >
        <Box
          onPointerOver={onHover}
          onPointerLeave={onHoverLeave}
          css={{
            padding: '$2',
            borderWidth: '$1',
            borderColor: 'currentColor',
            borderStyle: 'solid',
            mixBlendMode: 'soft-light',
            height: '100%',
            '&:hover': {
              backgroundColor: '$white',
              color: '$black',
              borderColor: '$black',
              mixBlendMode: 'normal',
            },
          }}
          {...props}
        >
          <Typography
            kind="h4"
            as="h2"
            css={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
          >
            {frontmatter.title}
            {frontmatter.draft && (
              <Typography as="span" kind="p2" css={{ ml: '$1' }}>
                Draft
              </Typography>
            )}
          </Typography>

          {frontmatter.publishedAt && (
            <Typography
              as="time"
              css={{
                fontFamily: '$mono',
              }}
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
            </Typography>
          )}
        </Box>
      </Link>
    </NextLink>
  );
};
