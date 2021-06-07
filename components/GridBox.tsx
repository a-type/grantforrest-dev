import { box } from '@styles/box';
import { HTMLAttributes, useMemo } from 'react';
import clsx from 'clsx';
import useMeasure from 'react-use-measure';
import { styled, theme } from 'stitches.config';

export interface GridBoxProps extends HTMLAttributes<HTMLDivElement> {
  outlined?: boolean;
  padded?: boolean;
}

const DEBUG = false;

export function GridBox({
  children,
  className,
  outlined,
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
    <GridBoxContainer
      className={className}
      padded={padded}
      outlined={outlined}
      {...rest}
    >
      <div ref={ref}>{children}</div>
      <div
        aria-hidden
        style={{
          width: size.width + offsetX,
          height: offsetY,
          backgroundColor: DEBUG ? 'red' : undefined,
        }}
      />
    </GridBoxContainer>
  );
}

const GridBoxContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  p: '0',
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
    outlined: {
      true: {
        outlineColor: '$gray',
      },
    },
  },
});
