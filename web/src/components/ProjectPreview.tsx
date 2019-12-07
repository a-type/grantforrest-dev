import * as React from 'react';
import { makeStyles, Typography, Button, Paper } from '@material-ui/core';
import { imageUrlFor } from '../lib/imageUrl';
import { buildImageObj, getPortfolioUrl, getPortfolioElementId } from '../lib/helpers';
import PortableText from './PortableText';
import { ProjectPreviewData } from '../pages';
import Link from './Link';
import clsx from 'clsx';

export type ProjectPreviewProps = {
  project: ProjectPreviewData;
  className?: string;
  imageWidth: number;
};

const useStyles = makeStyles(theme => ({
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
  },
  content: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: 400,
  },
}));

export const ProjectPreview: React.FC<ProjectPreviewProps> = props => {
  const { project, className } = props;
  const classes = useStyles(props);

  const imageSrc =
    project.mainImage &&
    imageUrlFor(buildImageObj(project.mainImage))
      .width(props.imageWidth)
      .height(Math.floor((9 / 16) * props.imageWidth))
      .auto('format')
      .url();

  return (
    <Link
      underline="never"
      color="inherit"
      to={getPortfolioUrl(project.publishedAt, project.slug)}
      className={clsx(classes.root, className)}
      style={{
        backgroundImage: `url(${imageSrc})`,
      }}
      id={getPortfolioElementId(project.publishedAt, project.slug)}
    >
      <Paper className={classes.content} elevation={4}>
        <Typography variant="h2" gutterBottom>
          {project.title}
        </Typography>
        <PortableText blocks={project._rawExcerpt} />
        <Button color="inherit">View project</Button>
      </Paper>
    </Link>
  );
};
