import * as React from 'react';
import { makeStyles, Theme, Paper, Typography, Box, IconButton } from '@material-ui/core';
import Img from 'gatsby-image';
import Link from './Link';
import { GitHub } from '@material-ui/icons';

export interface AboutProps {
  author: any;
}

const useStyles = makeStyles<Theme, AboutProps>(theme => ({
  about: {
    display: 'flex',
    position: 'relative',
    margin: 'auto',
    maxWidth: '900px',
    zIndex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(4),
    paddingTop: '20vmin',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    marginBottom: theme.spacing(4),
  },
  avatar: {
    position: 'absolute',
    zIndex: 3,
    top: '-15vmin',
    left: 'calc(50% - 15vmin)',
    borderRadius: '100%',
  },
  avatarImage: {
    width: '30vmin',
    height: '30vmin',
    borderRadius: '100%',
    border: `8px solid ${theme.palette.background.paper}`,
  },
}));

const About: React.FC<AboutProps> = props => {
  const { author } = props;
  const classes = useStyles(props);

  return (
    <Paper id="about" className={classes.about} elevation={0}>
      <div id="avatar" className={classes.avatar}>
        <Img
          fluid={author.avatar.fluid}
          alt={author.avatar.description}
          className={classes.avatarImage}
        />
      </div>
      <Typography variant="h1" gutterBottom style={{ textAlign: 'center' }}>
        Grant Forrest
      </Typography>
      <Typography paragraph>
        I write elegant code to power innovative user experiences. My focus is React, complemented
        by TypeScript, GraphQL, and graph databases.
      </Typography>
      <Typography paragraph>
        When I'm not writing code, I'm usually writing about my thoughts on theology, philosophy,
        faith, and morality. If you're interested in that, you can read more in my blog.
      </Typography>
      <Box mt={2} mb={2} display="flex" alignItems="center" justifyContent="center" width="100%">
        <IconButton
          color="primary"
          component={Link}
          to="https://github.com/a-type"
          underline="none"
        >
          <GitHub />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default About;
