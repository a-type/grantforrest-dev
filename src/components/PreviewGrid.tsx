import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { Previewable } from '../types';
import { PreviewCard } from './PreviewCard';

export interface PreviewGridProps {
  previewables: Previewable[];
}

const useStyles = makeStyles<Theme, PreviewGridProps>((theme) => ({
  grid: {
    display: 'grid',
    gridGap: theme.spacing(3),
    gridTemplateColumns: `repeat(12, 1fr)`,
    gridAutoFlow: 'dense',
    width: '100%',
  },
  gridItem: {
    alignSelf: 'center',
  },
  gridItemSmall: {
    gridColumn: 'span 12',
    [theme.breakpoints.up('sm')]: {
      gridColumn: 'span 6',
    },
    [theme.breakpoints.up('md')]: {
      gridColumn: 'span 4',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: 'span 2',
    },
  },
  gridItemMedium: {
    gridColumn: 'span 12',
    [theme.breakpoints.up('sm')]: {
      gridColumn: 'span 6',
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: 'span 4',
    },
  },
  gridItemLarge: {
    gridRow: 'span 2',
    gridColumn: 'span 12',
    [theme.breakpoints.up('lg')]: {
      gridColumn: 'span 6',
    },
  },
}));

const PreviewGrid: React.FC<PreviewGridProps> = (props) => {
  const { previewables } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.grid}>
      {previewables.map((previewable) => (
        <div
          key={previewable.url}
          className={clsx(classes.gridItem, {
            [classes.gridItemSmall]: previewable.size === 'small',
            [classes.gridItemMedium]: previewable.size === 'medium',
            [classes.gridItemLarge]: previewable.size === 'large',
          })}
        >
          <PreviewCard previewable={previewable} />
        </div>
      ))}
    </div>
  );
};

export default PreviewGrid;
