const { isFuture } = require('date-fns');
const WorkerPlugin = require('worker-plugin');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require('date-fns');

async function createBlogPostPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            id
            createdAt
            slug
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allContentfulBlogPost || {}).edges || [];

  postEdges
    .filter(edge => !isFuture(edge.node.createdAt))
    .forEach((edge, index) => {
      const { id, slug } = edge.node;
      const path = `/blog/${slug}/`;

      reporter.info(`Creating blog post page: ${path}`);

      createPage({
        path,
        component: require.resolve('./src/templates/BlogPost.tsx'),
        context: { id },
      });
    });
}

async function createPortfolioPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allContentfulProject {
        edges {
          node {
            id
            createdAt
            slug
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.allContentfulProject || {}).edges || [];

  projectEdges
    .filter(edge => !isFuture(edge.node.createdAt))
    .forEach((edge, index) => {
      const { id, slug } = edge.node;
      const path = `/portfolio/${slug}`;

      reporter.info(`Creating portfolio page: ${path}`);

      createPage({
        path,
        component: require.resolve('./src/templates/Project.tsx'),
        context: { id },
      });
    });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter);
  await createPortfolioPages(graphql, actions, reporter);
};

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
  actions.setWebpackConfig({
    plugins: [new WorkerPlugin()],
  });
};
