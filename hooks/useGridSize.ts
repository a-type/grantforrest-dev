import { theme } from 'stitches.config';

export function useGridSize() {
  return parseInt(theme.sizes.grid.value.toString().replace('px', ''), 10);
}
