import * as React from 'react';
import { makeStyles, Theme, NoSsr, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { DefaultSectionBackground } from './backgrounds/DefaultSectionBackground';
import { useAmbient } from 'react-ambient';

export type SectionWithBackgroundProps = {
  children: React.ReactNode | ((active: boolean) => React.ReactElement);
  background?: React.ReactNode;
  foreground?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

const useStyles = makeStyles<Theme, SectionWithBackgroundProps>((theme) => ({
  root: {
    minHeight: '50vh',
    marginBottom: theme.spacing(15),
  },
}));

export function SectionWithBackground(props: SectionWithBackgroundProps) {
  const classes = useStyles(props);
  const { children, background, className, foreground, ...rest } = props;

  const [bindProps, { renderBackground, activeData, active }] = useAmbient({
    data: {
      foreground: foreground,
    },
  });

  return (
    <section
      {...bindProps}
      {...rest}
      className={clsx(classes.root, className)}
      style={{
        color: activeData ? activeData.foreground : 'inherit',
      }}
    >
      {renderBackground(background || <DefaultSectionBackground />)}
      {typeof children === 'function' ? children(active) : children}
    </section>
  );
}
