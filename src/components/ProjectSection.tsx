import * as React from 'react';
import { makeStyles, Theme, Box, Typography, Grow, Button } from '@material-ui/core';
import { SectionWithBackground } from './SectionWithBackground';
import { ColorBackground } from './backgrounds/ColorBackground';
import GatsbyImage from 'gatsby-image';
import { Previewable } from '../types';
import RichText from './RichText';
import Link from './Link';

export type ProjectSectionProps = {
  project: Previewable;
};

const useStyles = makeStyles<Theme, ProjectSectionProps>((theme) => ({
  root: {
    display: 'grid',
    gridGap: theme.spacing(3),
    gridTemplateRows: 'auto 1fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 2fr',
    },
  },
  image: {
    flex: 1,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[8],
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& * + *': {
        marginLeft: 0,
        marginTop: theme.spacing(1),
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& * + *': {
        marginLeft: theme.spacing(1),
      },
    },
  },
}));

export function ProjectSection(props: ProjectSectionProps) {
  const classes = useStyles(props);
  const { project } = props;

  return (
    <SectionWithBackground
      background={<ColorBackground color={project.mainColor} />}
      foreground={project.textColor}
    >
      {(active) => (
        <Box className={classes.root} minHeight="70vh" py={3}>
          <Box>
            <Typography variant="h3" gutterBottom>
              {project.title}
            </Typography>
            {project.excerpt && <RichText source={project.excerpt} />}
            <Box className={classes.actions}>
              <Button component={Link} to={project.url} underline="none" variant="contained">
                Read more
              </Button>
              {project.alternateActions}
            </Box>
          </Box>
          <Grow in={active}>
            <Link to={project.url} underline="none" className={classes.image}>
              {project.coverImage &&
                (project.coverImage.fluid ? (
                  <GatsbyImage
                    fluid={project.coverImage.fluid}
                    alt={project.coverImage.description}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      height: '100%',
                    }}
                  >
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
                      src={project.coverImage.url}
                      alt={project.coverImage.description}
                    />
                  </div>
                ))}
            </Link>
          </Grow>
        </Box>
      )}
    </SectionWithBackground>
  );
}
