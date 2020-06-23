import * as React from 'react';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import { Container, makeStyles, Typography } from '@material-ui/core';
import PreviewGrid from '../components/PreviewGrid';
import { devlogToPreviewable } from '../lib/previewables';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
  },
}));

const ProjectDevlogsPage = (props: any) => {
  const { errors, pageContext } = props;
  const classes = useStyles(props);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const project = pageContext && pageContext.project;
  const postNodes =
    pageContext && pageContext.devlogs && pageContext.devlogs.map(({ node }: any) => node);
  const previewables = postNodes.map(devlogToPreviewable);

  return (
    <Layout>
      <SEO title={`${project.title} Devlog`} />
      <Container className={classes.container}>
        <Typography variant="h1" gutterBottom>
          {project.title} Devlog
        </Typography>
        <PreviewGrid previewables={previewables} />
      </Container>
    </Layout>
  );
};

export default ProjectDevlogsPage;
