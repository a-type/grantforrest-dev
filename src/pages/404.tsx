import * as React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { Typography, Container, Box } from '@material-ui/core';
import Link from '../components/Link';

const NotFoundPage = () => (
  <Layout>
    <SEO title="Page not found" />
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h1" gutterBottom>
          Not found
        </Typography>
        <Typography paragraph>This page was moved, deleted, or never existed.</Typography>
        <Typography paragraph>
          Perhaps you want to go back to my <Link href="/">homepage?</Link>
        </Typography>
      </Box>
    </Container>
  </Layout>
);

export default NotFoundPage;
