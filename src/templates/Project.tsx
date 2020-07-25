import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import { toPlainText } from '../lib/helpers';
import { Container, Box, Typography } from '@material-ui/core';
import { PostLayout } from '../components/PostLayout';
import { PostTitle } from '../components/PostTitle';
import { PostMainImage } from '../components/PostMainImage';
import { PostBody } from '../components/PostBody';
import { PostMeta } from '../components/PostMeta';
import { devlogToPreviewable } from '../lib/previewables';
import PreviewGrid from '../components/PreviewGrid';
import { isLight } from '../lib/colors';

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: contentfulProject(id: { eq: $id }) {
      ...ProjectFull
      devlog {
        slug
        id
        title
        createdAt
        mainImage {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
          description
        }
        project {
          slug
        }
      }
    }
  }
`;

const ProjectTemplate = (props: any) => {
  const { data, errors } = props;
  const project = data && data.project;

  const hasMainColor = !!project.mainColor;
  const isMainColorLight = isLight(project.mainColor);
  const forceMode = hasMainColor ? (isMainColorLight ? 'light' : 'dark') : undefined;

  return (
    <Layout
      style={{ backgroundColor: project.mainColor, color: project.textColor }}
      forceDarkMode={forceMode}
    >
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

      {project && (
        <Container component="article" maxWidth="md">
          <PostLayout>
            {project.mainImage && <PostMainImage image={project.mainImage} />}
            <PostTitle>{project.title}</PostTitle>
            <PostMeta createdAt={project.createdAt} homepageUrl={project.homepageUrl} />
            <PostBody body={project.body} />
          </PostLayout>
          {project && project.devlog && (
            <Box>
              <Typography variant="h2" id="devlogs" gutterBottom>
                Devlogs
              </Typography>
              <PreviewGrid previewables={project.devlog.map(devlogToPreviewable)} />
            </Box>
          )}
        </Container>
      )}
    </Layout>
  );
};

export default ProjectTemplate;
