import { ComponentPropsWithRef } from 'react';
import { styled } from 'stitches.config';

export const Box = styled('div', {
  $$gap: '0px',

  display: 'flex',
  flexDirection: 'column',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
        '& > * + *': {
          marginLeft: '$$gap',
        },
      },
      column: {
        flexDirection: 'column',
        '& > * + *': {
          marginTop: '$$gap',
        },
      },
      rowReverse: {
        flexDirection: 'row-reverse',
        '& > * + *': {
          marginRight: '$$gap',
        },
      },
      columnReverse: {
        flexDirection: 'column-reverse',
        '& > * + *': {
          marginBottom: '$$gap',
        },
      },
    },

    p: {
      large: {
        p: '$8',
      },
      medium: {
        p: '$4',
      },
      small: {
        p: '$2',
      },
      0: {
        p: '0',
      },
    },

    align: {
      center: {
        alignItems: 'center',
      },
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },

    justify: {
      center: {
        justifyContent: 'center',
      },
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
      stretch: {
        justifyContent: 'stretch',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
      spaceAround: {
        justifyContent: 'space-around',
      },
    },

    gap: {
      0: {
        $$gap: '0px',
      },
      1: {
        $$gap: '$space$1',
      },
      2: {
        $$gap: '$space$2',
      },
      3: {
        $$gap: '$space$3',
      },
      4: {
        $$gap: '$space$4',
      },
      5: {
        $$gap: '$space$5',
      },
      6: {
        $$gap: '$space$6',
      },
      7: {
        $$gap: '$space$7',
      },
      8: {
        $$gap: '$space$8',
      },
      9: {
        $$gap: '$space$9',
      },
      10: {
        $$gap: '$space$10',
      },
    },
  },

  defaultVariants: {
    direction: 'column',
    p: '0',
    align: 'start',
    gap: '0',
  },
});

export type BoxProps = ComponentPropsWithRef<typeof Box>;
