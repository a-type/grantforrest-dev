import * as React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../containers/Layout';
import { ProjectPreviewData } from '.';
import { Grid, makeStyles } from '@material-ui/core';
import { ProjectPreview } from '../components/ProjectPreview';

export const query = graphql`
  query PortfolioPageQuery {
    projects: allSanityProject(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: 64,
  },
  gridItem: {
    minHeight: '33vh',
  },
  projectPreview: {
    height: '100%',
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

  return (
    <Layout>
      <SEO title="Portfolio" />
      <Grid container className={classes.grid}>
        {nodes.map(project => (
          <Grid
            item
            key={project.id}
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            className={classes.gridItem}
          >
            <ProjectPreview project={project} className={classes.projectPreview} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default PortfolioPage;
