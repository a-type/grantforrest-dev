import * as React from 'react';
import {
  makeStyles,
  Theme,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  Link as MuiLink,
  Chip,
  Box,
  useTheme,
} from '@material-ui/core';
import GatsbyImage from 'gatsby-image';
import { format } from 'date-fns';
import RichText from './RichText';
import Link from './Link';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { FluidObject } from 'gatsby-image';

type PreviewSize = 'small' | 'medium' | 'large';
type PreviewType = 'project' | 'repo' | 'post';

export type Previewable = {
  title: string;
  excerpt: any | null;
  coverImage?: {
    description?: string;
    fluid?: FluidObject;
    url?: string;
  };
  url: string;
  size: PreviewSize;
  createdAt: string;
  sortedTime: string;
  type: PreviewType;
  extraContent?: React.ReactNode;
  labels: string[];
};
export interface PreviewGridProps {
  previewables: Previewable[];
}

const useStyles = makeStyles<Theme, PreviewGridProps>(theme => ({
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
      gridColumn: 'span 8',
    },
  },
  previewCard: {
    boxShadow: `-6px -6px 16px 0 #ffffff90, 6px 6px 16px 0 #d1cdc780`,
  },
  previewCardMedia: {
    border: `4px solid ${theme.palette.background.paper}`,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  previewCardActionFocusHighlight: {
    backgroundColor: '#ffffff',
  },
  previewCardActionArea: {
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: -24,
      left: -24,
      borderWidth: 24,
      borderStyle: 'solid',
      borderLeftColor: theme.palette.primary.main,
      borderTopColor: theme.palette.primary.main,
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      transition: theme.transitions.create(['top', 'left']),
    },
    '&:focus::after': {
      top: 0,
      left: 0,
    },
  },
  previewCardContent: {
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  previewCardLabels: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const PreviewGrid: React.FC<PreviewGridProps> = props => {
  const { previewables } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.grid}>
      {previewables.map(previewable => (
        <div
          key={previewable.url}
          className={clsx(classes.gridItem, {
            [classes.gridItemSmall]: previewable.size === 'small',
            [classes.gridItemMedium]: previewable.size === 'medium',
            [classes.gridItemLarge]: previewable.size === 'large',
          })}
        >
          <Card className={classes.previewCard}>
            <CardActionArea
              className={classes.previewCardActionArea}
              component={previewable.url.startsWith('http') ? MuiLink : Link}
              to={previewable.url}
              href={previewable.url}
              {...(previewable.url.startsWith('http')
                ? {
                    target: '_blank',
                    rel: 'noopener',
                  }
                : {})}
              underline="none"
              color="inherit"
              classes={{ focusHighlight: classes.previewCardActionFocusHighlight }}
            >
              {previewable.coverImage && (
                <CardMedia className={classes.previewCardMedia}>
                  {previewable.coverImage.fluid ? (
                    <GatsbyImage
                      alt={previewable.coverImage.description}
                      fluid={previewable.coverImage.fluid}
                    />
                  ) : (
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <div style={{ width: '100%', paddingBottom: '75%' }} />
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          objectFit: 'cover',
                          objectPosition: 'center center',
                        }}
                        src={previewable.coverImage.url}
                        alt={previewable.coverImage.description}
                      />
                    </div>
                  )}
                </CardMedia>
              )}
              <CardHeader
                title={previewable.title}
                subheader={format(new Date(previewable.createdAt), 'MMMM Do, YYYY')}
              />
              <CardContent className={classes.previewCardContent}>
                <Box
                  display="flex"
                  flexDirection="row"
                  mb={1}
                  className={classes.previewCardLabels}
                >
                  {previewable.labels.map(label => (
                    <Chip className={classes.label} label={label} />
                  ))}
                </Box>
                {previewable.extraContent}
                {typeof previewable.excerpt === 'string' ? (
                  <Typography>{previewable.excerpt}</Typography>
                ) : (
                  <RichText source={previewable.excerpt} />
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PreviewGrid;
