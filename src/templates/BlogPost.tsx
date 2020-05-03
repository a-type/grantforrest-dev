import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import BlogPost from '../components/Post';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import { toPlainText } from '../lib/helpers';
import { Container } from '@material-ui/core';

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

      {post && <BlogPost {...post} next={pageContext.next} prev={pageContext.prev} />}
    </Layout>
  );
};

export default BlogPostTemplate;
