import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { Container, makeStyles, NoSsr, Typography, Button, Paper } from '@material-ui/core';
import { Scene } from '../clouds/Scene';
import Navigation from '../components/Navigation';
import { BlogPostPreviewData, ProjectPreviewData, GithubReposData } from '../fragments';
import Img from 'gatsby-image';
import Link from '../components/Link';
import PreviewGrid from '../components/PreviewGrid';
import { getPortfolioUrl } from '../lib/helpers';
import { projectToPreviewable, repoToPreviewable } from '../lib/previewables';
import { compareDesc } from 'date-fns';

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
  heroContainer: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  },
  cloudScene: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
    height: `calc(100% - ${theme.spacing(2)}px)`,
    borderRadius: 24,
    overflow: 'hidden',
    margin: theme.spacing(1),
  },
  container: {
    marginTop: '50vh',
  },
  navigation: {
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
    position: 'relative',
    zIndex: 1,
    margin: theme.spacing(1),
    top: -theme.spacing(7),
    paddingTop: theme.spacing(2),
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
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
  work: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 24,
  },
  navButton: {
    margin: 'auto',
    marginTop: theme.spacing(3),
  },
}));

const IndexPage = (props: any) => {
  const { data, errors } = props;
  const classes = useStyles(props);

  if (errors) {
    return (
      <Layout stickyHeader>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes: BlogPostPreviewData[] = (data || {}).posts.nodes;
  const projectNodes: ProjectPreviewData[] = (data || {}).projects.nodes;
  const github: GithubReposData = (data || {}).github;
  const githubRepos = github.viewer.pinnedRepositories.nodes;
  const author: any = (data || {}).authors.nodes[0];

  const previewables = [
    ...projectNodes.map(projectToPreviewable),
    ...githubRepos.map(repoToPreviewable),
  ].sort((a, b) => compareDesc(a.sortedTime, b.sortedTime));

  return (
    <Layout>
      <SEO
        title="Grant Forrest"
        description="The personal website of Grant Forrest"
        keywords={['blog', 'react', 'frontend', 'developer', 'portfolio']}
      />
      <div className={classes.heroContainer}>
        <NoSsr>
          <div className={classes.cloudScene}>
            <Scene />
          </div>
        </NoSsr>
        <Navigation projects={projectNodes} blogPosts={postNodes} className={classes.navigation} />
      </div>
      <div className={classes.mainContent}>
        <Container className={classes.mainContainer}>
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
              I write elegant code to power innovative user experiences. My focus is React,
              complemented by TypeScript, GraphQL, and graph databases.
            </Typography>
            <Typography paragraph>
              When I'm not writing code, I'm usually writing about my thoughts on theology,
              philosophy, faith, and morality. If you're interested in that, you can read more in my
              blog.
            </Typography>
          </Paper>
          <div id="work" className={classes.work}>
            <Typography variant="h2" gutterBottom>
              Work
            </Typography>
            <PreviewGrid previewables={previewables} />
            <Button
              className={classes.navButton}
              color="primary"
              component={Link}
              to="/portfolio"
              underline="none"
            >
              All work
            </Button>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default IndexPage;
