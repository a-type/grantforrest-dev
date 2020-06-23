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
      allContentfulBlogPost(sort: { fields: [createdAt], order: ASC }) {
        edges {
          node {
            id
            createdAt
            slug
            title
            excerpt {
              json
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allContentfulBlogPost || {}).edges || [];

  postEdges
    .filter((edge) => !isFuture(edge.node.createdAt))
    .forEach((edge, index) => {
      const { id, slug } = edge.node;
      const path = `/blog/${slug}/`;

      const prevPostEdge = postEdges[index - 1];
      const nextPostEdge = postEdges[index + 1];
      const prevPostNode = prevPostEdge ? prevPostEdge.node : null;
      const nextPostNode = nextPostEdge ? nextPostEdge.node : null;

      reporter.info(`Creating blog post page: ${path}`);

      createPage({
        path,
        component: require.resolve('./src/templates/BlogPost.tsx'),
        context: { id, next: nextPostNode, prev: prevPostNode },
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
    .filter((edge) => !isFuture(edge.node.createdAt))
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

async function createDevlogPages(graphql, { createPage }, reporter) {
  const result = await graphql(`
    {
      allContentfulDevlog(sort: { fields: [createdAt], order: ASC }) {
        edges {
          node {
            id
            slug
            title
            createdAt
            project {
              id
              slug
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const devlogEdges = (result.data.allContentfulDevlog || {}).edges || [];

  const groupedByProject = devlogEdges
    .filter((edge) => !isFuture(edge.node.createdAt))
    .reduce((grouped, log) => {
      const projectId = log.node.project.id;
      grouped[projectId] = grouped[projectId] || [];
      grouped[projectId].push(log);
      return grouped;
    }, {});

  Object.keys(groupedByProject).forEach((projectId) => {
    const devlogs = groupedByProject[projectId];
    const project = devlogs[0].node.project;
    // make the list page
    createPage({
      path: `/portfolio/${project.slug}/devlogs`,
      component: require.resolve('./src/templates/ProjectDevlogs.tsx'),
      context: {
        project,
        devlogs,
      },
    });

    devlogs.forEach((edge, index) => {
      const { id, slug, project } = edge.node;
      const path = `/portfolio/${project.slug}/devlogs/${slug}`;

      const prevPostEdge = devlogs[index - 1];
      const nextPostEdge = devlogs[index + 1];
      const prevPostNode = prevPostEdge ? prevPostEdge.node : null;
      const nextPostNode = nextPostEdge ? nextPostEdge.node : null;

      reporter.info(`Creating devlog page: ${path}`);

      createPage({
        path,
        component: require.resolve('./src/templates/Devlog.tsx'),
        context: { id, project, next: nextPostNode, prev: prevPostNode },
      });
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter);
  await createPortfolioPages(graphql, actions, reporter);
  await createDevlogPages(graphql, actions, reporter);
};

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
  actions.setWebpackConfig({
    plugins: [new WorkerPlugin()],
  });
};
