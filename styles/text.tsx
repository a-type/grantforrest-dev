import { css } from 'stitches.config';

export const text = css({
  boxSizing: 'border-box',
  fontFamily: '$body',
  lineHeight: 'inherit',
  margin: 0,

  variants: {
    size: {
      1: {
        fontSize: '$1',
      },
      2: {
        fontSize: '$2',
      },
      3: {
        fontSize: '$3',
      },
      4: {
        fontSize: '$4',
      },
      5: {
        fontSize: '$5',
      },
      6: {
        fontSize: '$6',
      },
      7: {
        fontSize: '$7',
      },
      8: {
        fontSize: '$8',
      },
      9: {
        fontSize: '$9',
      },
    },
    role: {
      title: {
        fontWeight: 400,
        fontFamily: '$title',
      },
      body: {
        fontSize: '$3',
      },
    },
  },

  defaultVariants: {
    role: 'body',
    size: 3,
  },
});
