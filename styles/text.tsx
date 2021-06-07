import { css } from 'stitches.config';

export const text = css({
  boxSizing: 'border-box',
  fontFamily: '$body',
  lineHeight: 'inherit',
  margin: 0,
  display: 'block',
  transform: 'translateY(calc(-1 * var(--baseline-offset)))',

  variants: {
    size: {
      1: {
        fontSize: '$1',
        lineHeight: '$1',
        '--baseline-offset': '-0.5em',
      },
      2: {
        fontSize: '$2',
        lineHeight: '$2',
        '--baseline-offset': '-0.23em',
      },
      3: {
        fontSize: '$3',
        lineHeight: '$3',
        '--baseline-offset': '-0.44em',
      },
      4: {
        fontSize: '$4',
        lineHeight: '$4',
        '--baseline-offset': '-0.46em',
      },
      5: {
        fontSize: '$5',
        lineHeight: '$5',
        '--baseline-offset': '-0.25em',
      },
      6: {
        fontSize: '$6',
        lineHeight: '$6',
        '--baseline-offset': '-0.2em',
      },
    },
    gutter: {
      0: {
        marginBottom: '$0',
      },
      1: {
        marginBottom: '$1',
      },
      2: {
        marginBottom: '$2',
      },
      3: {
        marginBottom: '$3',
      },
      4: {
        marginBottom: '$4',
      },
    },
  },

  defaultVariants: {
    size: 2,
    gutter: 0,
  },
});
