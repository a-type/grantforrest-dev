import * as React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/GraphQLErrorList';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import { Container, makeStyles, Typography, IconButton, Box, NoSsr } from '@material-ui/core';
import { ProjectPreviewData, GithubReposData } from '../fragments';
import Link from '../components/Link';
import PreviewGrid from '../components/PreviewGrid';
import { projectToPreviewable, repoToPreviewable } from '../lib/previewables';
import { compareDesc } from 'date-fns';
import { GitHub } from '@material-ui/icons';
import VideoBackground from '../components/backgrounds/VideoBackground';
import clsx from 'clsx';
import RichText from '../components/RichText';
import { AmbientProvider } from 'react-ambient';
import { SectionWithBackground } from '../components/SectionWithBackground';
import { GithubBackground } from '../components/backgrounds/GithubBackground';
import { LowContrastImageBackground } from '../components/backgrounds/LowContrastImageBackground';
import { ProjectSection } from '../components/ProjectSection';
import { BackgroundSyncText } from '../components/BackgroundSyncText';

export const query = graphql`
  query IndexPageQuery {
    projects: allContentfulProject(limit: 10, sort: { fields: [createdAt], order: DESC }) {
      nodes {
        ...ProjectPreview
      }
    }
    authors: allContentfulAuthor(limit: 1) {
      nodes {
        id
        name
        summary {
          json
        }
        avatar {
          description
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    github {
      ...GithubRepos
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'relative',
    zIndex: 1,
    marginTop: '10vmin',
  },

  layout: {
    display: 'flex',
    flexDirection: 'column',
  },

  navigation: {
    gridArea: 'nav',
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  projectPreview: {
    height: '90vh',
    marginBottom: '20vh',
  },

  mainContent: {
    gridArea: 'content',
    display: 'flex',
    flexDirection: 'column',
  },

  work: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 24,
  },

  navButton: {
    margin: 'auto',
    marginTop: theme.spacing(3),
  },

  title: {
    fontSize: '20vmin',
    gridArea: 'title',
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
    },
  },

  about: {
    gridArea: 'about',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const IndexPage = (props: any) => {
  const { data, errors } = props;
  const classes = useStyles(props);

  if (errors) {
    return (
      <Layout noTitle>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const projectNodes: ProjectPreviewData[] = (data || {}).projects.nodes;
  const authors: { id: string; name: string; summary: { json: any }; avatar: any }[] = (data || {})
    .authors.nodes;
  const github: GithubReposData = (data || {}).github;
  const githubRepos = github.viewer.pinnedItems.nodes;

  const filterOutProjectRepos = githubRepos.filter(
    (repo) => !projectNodes.some((node) => node.githubUrl === repo.url),
  );

  const githubPreviewables = filterOutProjectRepos
    .map(repoToPreviewable)
    .sort((a, b) => compareDesc(a.sortedTime, b.sortedTime));

  console.log(projectNodes);

  const projectPreviewables = projectNodes
    .filter((proj) => !!proj.showOnHomepage)
    .map((project) => {
      // link with github repo if available
      const githubRepo = githubRepos.find((repo) => repo.url === project.githubUrl);
      return projectToPreviewable(project, githubRepo);
    })
    .sort((a, b) => compareDesc(a.sortedTime, b.sortedTime));

  return (
    <AmbientProvider debounceTimeout={50}>
      <Layout noTitle>
        <SEO
          title="Grant Forrest"
          description="The personal website of Grant Forrest"
          keywords={['blog', 'react', 'frontend', 'developer', 'portfolio']}
        />
        <Container className={clsx(classes.overlay, classes.layout)}>
          <SectionWithBackground
            className={classes.about}
            id="about"
            background={
              <VideoBackground
                sources={['/video/silence-sm.m4v']}
                posterSource="/video/silence.jpg"
                type="video/mp4"
              />
            }
          >
            <div className={classes.title}>
              <Typography variant="h1" gutterBottom className={classes.title}>
                Grant
                <br />
                Forrest
              </Typography>
            </div>
            <Box maxWidth={600} alignSelf="center">
              <RichText source={authors[0].summary} />
            </Box>
            <Box
              mt={2}
              mb={8}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <IconButton
                color="primary"
                component={Link}
                to="https://github.com/a-type"
                underline="none"
                rel="me"
              >
                <GitHub />
              </IconButton>
            </Box>
          </SectionWithBackground>
          <Box className={classes.mainContent} id="work">
            <BackgroundSyncText variant="h2" gutterBottom>
              Projects
            </BackgroundSyncText>
            <Box mt={4}>
              {projectPreviewables.map((proj) => (
                <ProjectSection project={proj} key={proj.url} />
              ))}
            </Box>
            <SectionWithBackground background={<GithubBackground />}>
              <Typography variant="h2" gutterBottom>
                Open Source
              </Typography>
              <PreviewGrid previewables={githubPreviewables} />
            </SectionWithBackground>
            <IconButton
              className={classes.navButton}
              color="primary"
              component={Link}
              to="https://github.com/a-type"
              underline="none"
              rel="me"
            >
              <GitHub />
            </IconButton>
          </Box>
        </Container>
      </Layout>
    </AmbientProvider>
  );
};

export default IndexPage;
