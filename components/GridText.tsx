import { box } from '@styles/box';
import clsx from 'clsx';
import { GridBox, GridBoxProps } from './GridBox';

export interface GridTextProps extends GridBoxProps {
  children?: React.ReactNode;
}

export function GridText({ className, ...props }: GridTextProps) {
  return (
    <GridBox
      className={clsx(
        box({
          gridTemplateAreas: '"offsetY offsetY" "content offsetX"',
        }).toString(),
        className?.toString(),
      )}
      {...props}
    />
  );
}
