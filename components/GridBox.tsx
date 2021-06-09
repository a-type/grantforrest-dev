import useMeasure from 'react-use-measure';
import { HTMLAttributes, useMemo } from 'react';
import { styled, theme } from 'stitches.config';

export interface GridBoxProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

const DEBUG = false;

export function GridBox({
  children,
  className,
  padded,
  ...rest
}: GridBoxProps) {
  const [ref, size] = useMeasure();

  const gridSize = useMemo(() => {
    const strV = theme.sizes[1].value;
    return parseInt(strV.replace('px', ''), 10);
  }, []);

  const offsetX = (() => {
    const remainder = size.width % gridSize;
    if (remainder < 0.00001) {
      return 0;
    }
    return gridSize - remainder;
  })();

  const offsetY = (() => {
    const remainder = size.height % gridSize;
    if (remainder < 0.00001) {
      return 0;
    }
    return gridSize - remainder;
  })();

  return (
    <GridBoxContainer className={className} padded={padded} {...rest}>
      <GridBoxContent ref={ref}>{children}</GridBoxContent>
      <GridBoxOffsetX
        aria-hidden
        style={{
          width: offsetX,
          backgroundColor: DEBUG ? 'red' : undefined,
        }}
      />
      <GridBoxOffsetY
        aria-hidden
        style={{
          height: offsetY,
          backgroundColor: DEBUG ? 'red' : undefined,
        }}
      />
    </GridBoxContainer>
  );
}

const GridBoxContainer = styled('div', {
  display: 'grid',
  gridTemplateAreas: '"content offsetX" "offsetY offsetY"',
  gridTemplateColumns: 'repeat(2, auto)',
  gridTemplateRows: 'repeat(2, auto)',
  p: '$1',
  bc: '$white',
  outlineWidth: '1px',
  outlineColor: 'transparent',
  outlineStyle: 'solid',
  variants: {
    padded: {
      true: {
        p: '$2',
      },
    },
  },
});

const GridBoxContent = styled('div', {
  gridArea: 'content',
  maxWidth: '70vw',
  '@bp3': {
    maxWidth: '$container',
  },
});

const GridBoxOffsetX = styled('div', {
  gridArea: 'offsetX',
});

const GridBoxOffsetY = styled('div', {
  gridArea: 'offsetY',
});
