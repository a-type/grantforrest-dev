import * as React from 'react';
import { makeStyles, Theme, NoSsr } from '@material-ui/core';
import clsx from 'clsx';
import { DefaultSectionBackground } from './backgrounds/DefaultSectionBackground';
import { useAmbient } from 'react-ambient';

export type SectionWithBackgroundProps = {
  children: React.ReactNode;
  background?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const useStyles = makeStyles<Theme, SectionWithBackgroundProps>((theme) => ({
  root: {
    minHeight: '50vh',
    marginBottom: theme.spacing(15),
  },
}));

export function SectionWithBackground(props: SectionWithBackgroundProps) {
  const classes = useStyles(props);
  const { children, background, className, ...rest } = props;

  const [bindProps, { renderBackground }] = useAmbient();

  return (
    <section {...bindProps} {...rest} className={clsx(classes.root, className)}>
      <NoSsr>{renderBackground(background || <DefaultSectionBackground />)}</NoSsr>
      {children}
    </section>
  );
}
