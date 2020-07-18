import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import { toPlainText } from '../lib/helpers';
import { Container } from '@material-ui/core';
import { PostMainImage } from '../components/PostMainImage';
import { PostLayout } from '../components/PostLayout';
import { PostTitle } from '../components/PostTitle';
import { PostMeta } from '../components/PostMeta';
import { PostBody } from '../components/PostBody';
import { AdjacentPosts } from '../components/AdjacentPosts';
import { postToPreviewable } from '../lib/previewables';

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: contentfulBlogPost(id: { eq: $id }) {
      ...BlogPostFull
    }
  }
`;

const BlogPostTemplate = (props: any) => {
  const { data, errors, pageContext } = props;
  const post = data && data.post;

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {post && (
        <SEO
          title={post.title || 'Untitled'}
          description={toPlainText(post._rawExcerpt)}
          image={post.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {post && (
        <Container component="article" maxWidth="md">
          {post.mainImage && <PostMainImage image={post.mainImage} />}
          <PostLayout>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta createdAt={post.createdAt} />
            <PostBody body={post.body} />
          </PostLayout>
          <AdjacentPosts
            next={pageContext.next && postToPreviewable(pageContext.next)}
            prev={pageContext.prev && postToPreviewable(pageContext.prev)}
          />
        </Container>
      )}
    </Layout>
  );
};

export default BlogPostTemplate;
