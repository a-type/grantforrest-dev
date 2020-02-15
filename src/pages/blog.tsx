import * as React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import BlogPostPreviewGrid from '../components/BlogPostPreviewGrid';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { Typography, Container, makeStyles } from '@material-ui/core';
import PreviewGrid from '../components/PreviewGrid';
import { postToPreviewable } from '../lib/previewables';

export const query = graphql`
  query ArchivePageQuery {
    posts: allContentfulBlogPost(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          ...BlogPostPreview
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(12),
  },
}));

const ArchivePage = (props: any) => {
  const { data, errors } = props;
  const classes = useStyles(props);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);
  const previewables = postNodes.map(postToPreviewable);

  return (
    <Layout>
      <SEO title="Blog" />
      <Container className={classes.container}>
        <PreviewGrid previewables={previewables} />
      </Container>
    </Layout>
  );
};

export default ArchivePage;
