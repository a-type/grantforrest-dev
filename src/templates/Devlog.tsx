import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import { toPlainText } from '../lib/helpers';
import { Container, Box } from '@material-ui/core';
import { devlogToPreviewable } from '../lib/previewables';
import { PostLayout } from '../components/PostLayout';
import { PostMainImage } from '../components/PostMainImage';
import { PostTitle } from '../components/PostTitle';
import { PostMeta } from '../components/PostMeta';
import { PostBody } from '../components/PostBody';
import { AdjacentPosts } from '../components/AdjacentPosts';
import Link from '../components/Link';

export const query = graphql`
  query DevlogTemplateQuery($id: String!) {
    devlog: contentfulDevlog(id: { eq: $id }) {
      ...DevlogFull
    }
  }
`;

const DevlogTemplate = (props: any) => {
  const { data, errors, pageContext } = props;
  const devlog = data && data.devlog;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {devlog && (
        <SEO
          title={devlog.title || 'Untitled'}
          description={toPlainText(devlog._rawExcerpt)}
          image={devlog.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {devlog && (
        <Container component="article" maxWidth="md">
          <PostLayout>
            {devlog.mainImage && <PostMainImage image={devlog.mainImage} />}
            <PostTitle>{devlog.title}</PostTitle>
            <PostMeta createdAt={devlog.createdAt} />
            <PostBody body={devlog.body} />
          </PostLayout>
          <AdjacentPosts
            next={pageContext.next && devlogToPreviewable(pageContext.next)}
            prev={pageContext.prev && devlogToPreviewable(pageContext.prev)}
          />
          <Box mt={3}>
            <Link to={`/portfolio/${devlog.project.slug}#devlogs`}>Back to project</Link>
          </Box>
        </Container>
      )}
    </Layout>
  );
};

export default DevlogTemplate;
