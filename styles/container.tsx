import { MAX_BODY_WIDTH } from '@constants/layout';
import { css } from 'stitches.config';

export const container = css({
  boxSizing: 'border-box',
  maxWidth: MAX_BODY_WIDTH,
  width: '100%',
  px: 0,
});
