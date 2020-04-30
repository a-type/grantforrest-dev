import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { Container, makeStyles, Typography, IconButton, Box } from '@material-ui/core';
import { BlogPostPreviewData, ProjectPreviewData, GithubReposData } from '../fragments';
import Link from '../components/Link';
import PreviewGrid from '../components/PreviewGrid';
import { projectToPreviewable, repoToPreviewable } from '../lib/previewables';
import { compareDesc } from 'date-fns';
import { GitHub } from '@material-ui/icons';
import VideoBackground from '../components/VideoBackground';
import clsx from 'clsx';

export const query = graphql`
  query IndexPageQuery {
    posts: allContentfulBlogPost(limit: 2, sort: { fields: [createdAt], order: DESC }) {
      nodes {
        ...BlogPostPreview
      }
    }
    projects: allContentfulProject(limit: 4, sort: { fields: [createdAt], order: DESC }) {
      nodes {
        ...ProjectPreview
      }
    }
    authors: allContentfulAuthor(limit: 1) {
      nodes {
        id
        avatar {
          description
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    github {
      ...GithubRepos
    }
  }
`;

const useStyles = makeStyles(theme => ({
  overlay: {
    position: 'relative',
    zIndex: 1,
    marginTop: '10vmin',
  },

  layout: {
    display: 'grid',
    gridTemplateAreas: '"title" "about" "content"',
    gridTemplateRows: '40vh auto auto auto',
    gridGap: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      gridTemplateRows: '80vh auto auto',
    },
  },

  navigation: {
    gridArea: 'nav',
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  projectPreview: {
    height: '90vh',
    marginBottom: '20vh',
  },

  mainContent: {
    gridArea: 'content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  work: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 24,
  },

  navButton: {
    margin: 'auto',
    marginTop: theme.spacing(3),
  },

  title: {
    fontSize: '20vmin',
    gridArea: 'title',
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
    },
  },

  about: {
    gridArea: 'about',
    maxWidth: 600,
    justifySelf: 'center',
  },
}));

const IndexPage = (props: any) => {
  const { data, errors } = props;
  const classes = useStyles(props);

  if (errors) {
    return (
      <Layout noTitle>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes: BlogPostPreviewData[] = (data || {}).posts.nodes;
  const projectNodes: ProjectPreviewData[] = (data || {}).projects.nodes;
  const github: GithubReposData = (data || {}).github;
  const githubRepos = github.viewer.pinnedItems.nodes;

  const filterOutProjectRepos = githubRepos.filter(
    repo => !projectNodes.some(node => node.githubUrl === repo.url),
  );

  const previewables = [
    ...projectNodes.map(project => {
      // link with github repo if available
      const githubRepo = githubRepos.find(repo => repo.url === project.githubUrl);
      return projectToPreviewable(project, githubRepo);
    }),
    ...filterOutProjectRepos.map(repoToPreviewable),
  ].sort((a, b) => compareDesc(a.sortedTime, b.sortedTime));

  return (
    <Layout noTitle>
      <SEO
        title="Grant Forrest"
        description="The personal website of Grant Forrest"
        keywords={['blog', 'react', 'frontend', 'developer', 'portfolio']}
      />
      <VideoBackground
        sources={['/video/silence-md.m4v', '/video/silence.mp4']}
        posterSource="/video/silence.jpg"
        type="video/mp4"
      />
      <Container className={clsx(classes.overlay, classes.layout)}>
        <div className={classes.title}>
          <Typography variant="h1" gutterBottom className={classes.title}>
            Grant
            <br />
            Forrest
          </Typography>
        </div>
        <div className={classes.about} id="about">
          {/* TODO: move this to Contentful. */}
          <Typography paragraph>
            I write elegant code to power innovative user experiences. My focus is React,
            complemented by TypeScript, GraphQL, and graph databases.
          </Typography>
          <Typography paragraph>
            When I'm not writing code, I'm usually writing about my thoughts on theology,
            philosophy, faith, and morality. If you're interested in that, you can read more in my
            blog.
          </Typography>
          <Box
            mt={2}
            mb={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <IconButton
              color="primary"
              component={Link}
              to="https://github.com/a-type"
              underline="none"
              rel="me"
            >
              <GitHub />
            </IconButton>
          </Box>
        </div>
        <Box className={classes.mainContent} id="work">
          <PreviewGrid previewables={previewables} />
          <IconButton
            className={classes.navButton}
            color="primary"
            component={Link}
            to="https://github.com/a-type"
            underline="none"
            rel="me"
          >
            <GitHub />
          </IconButton>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
