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

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost(
      limit: 2
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
    projects: allSanityProject(
      limit: 4
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          title
          _rawExcerpt
          slug {
            current
          }
          mainImage {
            ...SanityImage
            alt
          }
        }
      }
    }
  }
`;

export type BlogPostPreviewData = {
  id: string;
  publishedAt: string;
  title: string;
  _rawExcerpt: any;
  slug: {
    current: string;
  };
  mainImage: any;
};

export type ProjectPreviewData = {
  id: string;
  publishedAt: string;
  title: string;
  _rawExcerpt: any;
  slug: {
    current: string;
  };
  mainImage: any;
};

const useStyles = makeStyles(theme => ({
  heroContainer: {
    width: '100%',
    height: '99vh',
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  cloudScene: {
    width: '100%',
    height: '100%',
  },
  container: {
    marginTop: '50vh',
  },
  navigation: {
    position: 'absolute',
    bottom: theme.spacing(3),
    left: theme.spacing(3),
  },
  projectPreview: {
    height: '99vh',
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

  const site = (data || {}).site;
  const postNodes: BlogPostPreviewData[] = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];
  const projectNodes: ProjectPreviewData[] = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <Layout stickyHeader>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <div className={classes.heroContainer}>
        <NoSsr>
          <div className={classes.cloudScene}>
            <Scene />
          </div>
        </NoSsr>
        <Navigation projects={projectNodes} blogPosts={postNodes} className={classes.navigation} />
      </div>
      {projectNodes.map(project => (
        <ProjectPreview
          project={project}
          key={project.id}
          className={classes.projectPreview}
          imageWidth={windowWidth}
        />
      ))}
    </Layout>
  );
};

export default IndexPage;
