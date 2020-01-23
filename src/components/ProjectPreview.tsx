import * as React from 'react';
import { makeStyles, Typography, Button, Paper, Theme } from '@material-ui/core';
import { getPortfolioUrl, getPortfolioElementId } from '../lib/helpers';
import { ProjectPreviewData } from '../fragments';
import Link from './Link';
import clsx from 'clsx';
import RichText from './RichText';
import Img from 'gatsby-image';

export type ProjectPreviewProps = {
  project: ProjectPreviewData;
  className?: string;
  imageWidth: number;
  side?: 'left' | 'right';
};

const useStyles = makeStyles<Theme, ProjectPreviewProps>(theme => ({
  root: {
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textDecoration: 'none',
    cursor: 'pointer',
    position: 'relative',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  content: props => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: 400,
    position: 'relative',
    zIndex: 1,
    marginTop: 'auto',
    margin: 'auto',

    [theme.breakpoints.up('sm')]: {
      marginBottom: 'auto',
    },
  }),
  expandingImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundSize: 'cover',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
  },
  image: {
    width: '100%',
    height: '100%',
  },
}));

export const ProjectPreview: React.FC<ProjectPreviewProps> = props => {
  const { project, className, side = 'right' } = props;
  const classes = useStyles(props);

  return (
    <Link
      underline="never"
      color="inherit"
      to={getPortfolioUrl(project.slug)}
      className={clsx(classes.root, className)}
      id={getPortfolioElementId(project.slug)}
    >
      <Paper className={classes.content} elevation={2}>
        <Typography variant="h2" gutterBottom>
          {project.title}
        </Typography>
        <RichText source={project.summary} />
        <Button color="inherit">View project</Button>
      </Paper>
      <div className={classes.expandingImage}>
        <Img
          fluid={project.mainImage.fluid}
          alt={project.mainImage.description}
          className={classes.image}
          imgStyle={{ objectFit: 'cover' }}
        />
      </div>
    </Link>
  );
};
