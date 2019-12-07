import * as React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { imageUrlFor } from '../lib/imageUrl';
import { buildImageObj, getPortfolioUrl } from '../lib/helpers';
import PortableText from './PortableText';
import { ProjectPreviewData } from '../pages';
import Link from './Link';

export type ProjectPreviewProps = {
  project: ProjectPreviewData;
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '99vh',
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
  },
  content: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#00000060',
    color: theme.palette.common.white,
    padding: theme.spacing(2),
  },
}));

export const ProjectPreview: React.FC<ProjectPreviewProps> = props => {
  const { project } = props;
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
      className={classes.root}
      style={{
        backgroundImage: `url(${imageSrc})`,
      }}
    >
      <div className={classes.content}>
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
      </div>
    </div>
  );
};
