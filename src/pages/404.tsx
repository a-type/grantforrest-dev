import * as React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { Typography } from '@material-ui/core';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Typography variant="h1">NOT FOUND</Typography>
    <Typography paragraph>You just hit a route that doesn&#39;t exist... the sadness.</Typography>
  </Layout>
);

export default NotFoundPage;
