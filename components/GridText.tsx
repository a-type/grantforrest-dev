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
        box({ flexDirection: 'column-reverse' }).toString(),
        className?.toString(),
      )}
      {...props}
    />
  );
}
