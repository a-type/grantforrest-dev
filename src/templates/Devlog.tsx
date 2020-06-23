import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import DevlogView from '../components/Devlog';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import { toPlainText } from '../lib/helpers';
import { Container } from '@material-ui/core';

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

      {devlog && <DevlogView {...devlog} next={pageContext.next} prev={pageContext.prev} />}
    </Layout>
  );
};

export default DevlogTemplate;
