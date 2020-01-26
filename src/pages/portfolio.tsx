import * as React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { ProjectPreviewData } from '../fragments';
import { makeStyles, Container } from '@material-ui/core';
import { projectToPreviewable } from '../lib/previewables';
import PreviewGrid from '../components/PreviewGrid';

export const query = graphql`
  query PortfolioPageQuery {
    projects: allContentfulProject(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          ...ProjectPreview
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

const PortfolioPage = (props: any) => {
  const { data, errors } = props;
  const classes = useStyles(props);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const nodes: ProjectPreviewData[] = data && data.projects ? mapEdgesToNodes(data.projects) : [];
  const previewables = nodes.map(projectToPreviewable);

  return (
    <Layout>
      <SEO title="Portfolio" />
      <Container className={classes.container}>
        <PreviewGrid previewables={previewables} />
      </Container>
    </Layout>
  );
};

export default PortfolioPage;
