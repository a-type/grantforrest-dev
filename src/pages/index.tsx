import * as React from 'react';
import { graphql } from 'gatsby';
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from '../lib/helpers';
import BlogPostPreviewGrid from '../components/BlogPostPreviewGrid';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { Container, makeStyles, NoSsr } from '@material-ui/core';
import { Scene } from '../clouds/Scene';
import Navigation from '../components/Navigation';
import { ProjectPreview } from '../components/ProjectPreview';
import useWindowSize from '../lib/useWindowSize';
import { BlogPostPreviewData, ProjectPreviewData } from '../fragments';

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
  }
`;

const useStyles = makeStyles(theme => ({
  heroContainer: {
    width: '100%',
    height: '99vh',
    position: 'relative',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    overflow: 'hidden',
  },
  cloudScene: {
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius * 4,
    overflow: 'hidden',
  },
  container: {
    marginTop: '50vh',
  },
  navigation: {
    position: 'absolute',
    bottom: theme.spacing(5),
    left: theme.spacing(5),
  },
  projectPreview: {
    height: '90vh',
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

  return (
    <Layout stickyHeader>
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
      {projectNodes.map((project, idx) => (
        <ProjectPreview
          project={project}
          key={project.id}
          className={classes.projectPreview}
          imageWidth={windowWidth}
          side={idx % 2 === 0 ? ('right' as const) : ('left' as const)}
        />
      ))}
    </Layout>
  );
};

export default IndexPage;
