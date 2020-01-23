import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { Container, makeStyles, NoSsr, Typography, Button } from '@material-ui/core';
import { Scene } from '../clouds/Scene';
import Navigation from '../components/Navigation';
import { ProjectPreview } from '../components/ProjectPreview';
import useWindowSize from '../lib/useWindowSize';
import { BlogPostPreviewData, ProjectPreviewData } from '../fragments';
import Img from 'gatsby-image';
import Link from '../components/Link';

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
  }
`;

const useStyles = makeStyles(theme => ({
  heroContainer: {
    width: '100%',
    height: '99vh',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    overflow: 'hidden',
    position: 'fixed',
    zIndex: -1,
  },
  cloudScene: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  container: {
    marginTop: '50vh',
  },
  navigation: {
    height: '100vh',
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
  about: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    width: '33vmin',
    height: '33vmin',
    borderRadius: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(4),
  },
  work: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
  },
  navButton: {
    margin: 'auto',
    marginTop: theme.spacing(3),
  },
}));

const IndexPage = (props: any) => {
  const { data, errors } = props;
  const classes = useStyles(props);
  const { width: windowWidth } = useWindowSize();

  if (errors) {
    return (
      <Layout stickyHeader>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes: BlogPostPreviewData[] = (data || {}).posts.nodes;
  const projectNodes: ProjectPreviewData[] = (data || {}).projects.nodes;
  const author: any = (data || {}).authors.nodes[0];

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
      </div>
      <Navigation projects={projectNodes} blogPosts={postNodes} className={classes.navigation} />
      <Container>
        <div id="about" className={classes.about}>
          <Img
            fluid={author.avatar.fluid}
            alt={author.avatar.description}
            className={classes.avatar}
          />
          <Typography variant="h2" gutterBottom>
            Grant Forrest
          </Typography>
          <Typography paragraph>
            I can write code just about anywhere, but I prefer the browser. Something about seeing
            something beautiful slowly unfold on screen motivates me to continue learning and
            building new things.
          </Typography>
          <Typography paragraph>
            I appreciate the beauty in code itself, as well. I try to think things through,
            continuing to innovate and invent in the name of maintainability, elegance, and
            simplicity.
          </Typography>
        </div>
        <div id="work" className={classes.work}>
          {projectNodes.map((project, idx) => (
            <ProjectPreview
              project={project}
              key={project.id}
              className={classes.projectPreview}
              imageWidth={windowWidth}
            />
          ))}
          <Button
            className={classes.navButton}
            color="secondary"
            component={Link}
            to="/portfolio"
            underline="none"
          >
            All work
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
