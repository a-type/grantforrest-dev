import * as React from 'react';
import { Previewable } from '../types';
import {
  Card,
  CardActionArea,
  makeStyles,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Link as MuiLink,
  Box,
  Chip,
} from '@material-ui/core';
import GatsbyImage from 'gatsby-image';
import RichText from './RichText';
import Link from './Link';
import { format } from 'date-fns';

export type PreviewCardProps = {
  children?: React.ReactNode;
  previewable: Previewable;
};

const useStyles = makeStyles((theme) => ({
  previewCard: {
    // boxShadow: `-6px -6px 16px 0 #ffffff80, 6px 6px 16px 0 #d1cdc780`,
    // border: `4px solid ${theme.palette.grey[200]}`,
    boxShadow: 'none',
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
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
  },
  previewCardContent: {
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  previewCardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
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

export function PreviewCard({ previewable }: PreviewCardProps) {
  const classes = useStyles({});

  if (!previewable) return null;

  return (
    <Card className={classes.previewCard}>
      <CardActionArea
        className={classes.previewCardActionArea}
        component={previewable.url && previewable.url.startsWith('http') ? MuiLink : Link}
        to={previewable.url}
        href={previewable.url}
        {...(previewable.url && previewable.url.startsWith('http')
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
                <div style={{ width: '100%', paddingBottom: '60%' }} />
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
          <Box display="flex" flexDirection="row" mb={1} className={classes.previewCardLabels}>
            {previewable.labels.map((label) => (
              <Chip className={classes.label} label={label} />
            ))}
          </Box>
          {previewable.extraContent}
          {previewable.excerpt && (
            <>
              {typeof previewable.excerpt === 'string' ? (
                <Typography>{previewable.excerpt}</Typography>
              ) : (
                <RichText source={previewable.excerpt} />
              )}
            </>
          )}
        </CardContent>
      </CardActionArea>
      {previewable.alternateActions && (
        <CardActions className={classes.previewCardActions}>
          {previewable.alternateActions}
        </CardActions>
      )}
    </Card>
  );
}
