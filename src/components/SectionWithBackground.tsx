import * as React from 'react';
import { makeStyles, Theme, NoSsr } from '@material-ui/core';
import { useFirstVisibleSection } from '../contexts/FirstVisibleContext';
import clsx from 'clsx';
import { DefaultSectionBackground } from './backgrounds/DefaultSectionBackground';

export type SectionWithBackgroundProps = {
  children: React.ReactNode;
  groupName: string;
  sectionKey: string;
  background?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const useStyles = makeStyles<Theme, SectionWithBackgroundProps>((theme) => ({
  root: {
    minHeight: '80vh',
    marginBottom: theme.spacing(15),
  },
}));

export function SectionWithBackground(props: SectionWithBackgroundProps) {
  const classes = useStyles(props);
  const { groupName, title, children, background, sectionKey, className, ...rest } = props;

  const [bindProps, { renderBackground }] = useFirstVisibleSection(groupName, sectionKey);

  return (
    <section {...bindProps} {...rest} className={clsx(classes.root, className)}>
      <NoSsr>{renderBackground(background || <DefaultSectionBackground />)}</NoSsr>
      {children}
    </section>
  );
}
