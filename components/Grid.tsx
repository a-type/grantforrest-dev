import { styled } from '@stitches/react';

import { Box } from './Box';

export const Grid = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gridGap: '$4',
});
