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
} from '@material-ui/core';
import GatsbyImage from 'gatsby-image';
import { format } from 'date-fns';
import RichText from './RichText';
import Link from './Link';

type PreviewSize = 'small' | 'medium' | 'large';
type PreviewType = 'project' | 'repo' | 'post';

export interface PreviewGridProps {
  previewables: {
    title: string;
    excerpt: any | null;
    coverImage?: any;
    url: string;
    size: PreviewSize;
    createdAt: string;
    type: PreviewType;
    extraContent?: React.ReactNode;
  }[];
}

const useStyles = makeStyles<Theme, PreviewGridProps>(theme => ({
  previewCard: {
    boxShadow: `-6px -6px 16px 0 #ffffff90, 6px 6px 16px 0 #d1cdc780`,
    overflow: 'visible',
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
    transition: theme.transitions.create('box-shadow'),
    '&:focus': {
      boxShadow: `0 0 0 8px ${theme.palette.secondary.main}`,
    },
  },
}));

const toGridSizes = (size: PreviewSize) => {
  switch (size) {
    case 'large':
      return {
        xs: 12 as const,
        sm: 12 as const,
        md: 12 as const,
        lg: 6 as const,
        xl: 6 as const,
      };
    case 'medium':
      return {
        xs: 12 as const,
        sm: 6 as const,
        md: 6 as const,
        lg: 4 as const,
        xl: 4 as const,
      };
    default:
      return {
        xs: 6 as const,
        sm: 4 as const,
        md: 4 as const,
        lg: 4 as const,
        xl: 4 as const,
      };
  }
};

const PreviewGrid: React.FC<PreviewGridProps> = props => {
  const { previewables } = props;
  const classes = useStyles(props);

  return (
    <Grid container spacing={3}>
      {previewables.map(previewable => (
        <Grid item key={previewable.url} {...toGridSizes(previewable.size)}>
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
                  <GatsbyImage
                    alt={previewable.coverImage.description}
                    fluid={previewable.coverImage.fluid}
                  />
                </CardMedia>
              )}
              <CardHeader
                title={previewable.title}
                subheader={format(new Date(previewable.createdAt), 'MMMM Do, YYYY')}
              />
              <CardContent>
                {previewable.extraContent}
                {typeof previewable.excerpt === 'string' ? (
                  <Typography>{previewable.excerpt}</Typography>
                ) : (
                  <RichText source={previewable.excerpt} />
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PreviewGrid;
