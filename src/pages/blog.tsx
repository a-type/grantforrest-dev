import * as React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import BlogPostPreviewGrid from '../components/BlogPostPreviewGrid';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { Typography, Container, makeStyles } from '@material-ui/core';

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
    marginTop: 64,
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

  return (
    <Layout>
      <SEO title="Archive" />
      <Container className={classes.container}>
        <Typography variant="h1">Blog</Typography>
        {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
      </Container>
    </Layout>
  );
};

export default ArchivePage;
