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
  },
  content: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
}));

export const ProjectPreview: React.FC<ProjectPreviewProps> = props => {
  const { project, className } = props;
  const classes = useStyles(props);

  const imageSrc =
    project.mainImage &&
    imageUrlFor(buildImageObj(project.mainImage))
      .width(600)
      .height(Math.floor((9 / 16) * 600))
      .auto('format')
      .url();

  return (
    <div
      className={clsx(classes.root, className)}
      style={{
        backgroundImage: `url(${imageSrc})`,
      }}
      id={getPortfolioElementId(project.publishedAt, project.slug)}
    >
      <Paper className={classes.content}>
        <Typography variant="h2" gutterBottom>
          {project.title}
        </Typography>
        <PortableText blocks={project._rawExcerpt} />
        <Button
          color="inherit"
          component={Link}
          to={getPortfolioUrl(project.publishedAt, project.slug)}
        >
          View project
        </Button>
      </Paper>
    </div>
  );
};
