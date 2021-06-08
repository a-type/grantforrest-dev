import { css } from 'stitches.config';

export const container = css({
  boxSizing: 'border-box',
  ml: '$2',
  my: '$2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  '@bp2': {
    ml: '$4',
  },
});
