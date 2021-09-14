import { ComponentPropsWithRef } from 'react';
import { styled } from 'stitches.config';

export const Typography = styled('span', {
  fontFamily: '$default',

  variants: {
    kind: {
      h1: {
        fontSize: '$h1',
        fontWeight: '$h1',
        lineHeight: '$h1',
      },
      h2: {
        fontSize: '$h2',
        fontWeight: '$h2',
        lineHeight: '$h2',
      },
      h3: {
        fontSize: '$h3',
        fontWeight: '$h3',
        lineHeight: '$h3',
      },
      h4: {
        fontSize: '$h4',
        fontWeight: '$h4',
        lineHeight: '$h4',
      },
      l1: {
        fontSize: '$l1',
        fontWeight: '$l1',
        lineHeight: '$l1',
      },
      p1: {
        fontSize: '$p1',
        fontWeight: '$p1',
        lineHeight: '$p1',
      },
      p2: {
        fontSize: '$p2',
        fontWeight: '$p2',
        lineHeight: '$p2',
      },
      b1: {
        fontSize: '$b1',
        fontWeight: '$b1',
        lineHeight: '$b1',
      },
      b2: {
        fontSize: '$b2',
        fontWeight: '$b2',
        lineHeight: '$b2',
      },
    },
  },

  defaultVariants: {
    kind: 'p1',
  },
});

export type TypographyProps = ComponentPropsWithRef<typeof Typography>;
