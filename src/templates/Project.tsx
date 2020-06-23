import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import ProjectView from '../components/Project';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import { toPlainText } from '../lib/helpers';
import { Container, Box } from '@material-ui/core';
import Link from '../components/Link';

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: contentfulProject(id: { eq: $id }) {
      ...ProjectFull
      devlog {
        slug
      }
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
      {project && project.devlog && (
        <Container maxWidth="md">
          <Box pt={3}>
            <Link to={`/portfolio/${project.slug}/devlogs`}>Devlog</Link>
          </Box>
        </Container>
      )}
    </Layout>
  );
};

export default ProjectTemplate;
