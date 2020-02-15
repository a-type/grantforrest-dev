import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import ProjectView from '../components/Project';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { toPlainText } from '../lib/helpers';
import { Container } from '@material-ui/core';

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: contentfulProject(id: { eq: $id }) {
      ...ProjectFull
    }
  }
`;

const ProjectTemplate = (props: any) => {
  const { data, errors } = props;
  const project = data && data.project;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {project && (
        <SEO
          title={project.title || 'Untitled'}
          description={toPlainText(project._rawExcerpt)}
          image={project.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {project && <ProjectView {...project} />}
    </Layout>
  );
};

export default ProjectTemplate;
