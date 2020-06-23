import { format, distanceInWords, differenceInDays } from 'date-fns';
import * as React from 'react';
import { Container, Box, Typography, makeStyles } from '@material-ui/core';
import { BlogPostFullData, BlogPostPreviewData, DevlogFullData } from '../fragments';
import GatsbyImage from 'gatsby-image';
import RichText from './RichText';
import { animated } from '@react-spring/web';
import BlogPostPreview from '../components/BlogPostPreview';
import { PreviewCard } from './PreviewCard';
import { devlogToPreviewable } from '../lib/previewables';
import Link from './Link';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mainImageContainer: {
    display: 'block',
    position: 'relative',
    width: '100%',
    padding: theme.spacing(1),
    paddingTop: 64 + theme.spacing(1),
    height: '40vh',
    overflow: 'hidden',

    '& img': {
      display: 'block',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      verticalAlign: 'top',
      objectFit: 'cover',
    },
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  grid: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '3fr 1fr',
      gridColumnGap: '2em',
    },
  },
  mainContent: {
    marginTop: theme.spacing(4),

    '& a': {
      color: theme.palette.primary.main,
    },
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  metaContent: {
    alignSelf: 'start',
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  createdAt: {
    color: theme.palette.text.primary,
  },
  categories: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),

    '& ul': {
      listStyle: 'none',
      margin: '0.75rem 0',
      padding: 0,

      '& li': {
        padding: '0.25rem 0',
      },
    },
  },
  categoriesHeadline: {
    margin: '0.5rem 0 0',
    fontSize: theme.typography.pxToRem(18),
  },
  adjacentPosts: {
    marginTop: theme.spacing(6),
    display: 'grid',
    gridTemplateAreas: '"next" "prev"',
    gridGap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      gridGap: theme.spacing(4),
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: '"prev next"',
    },
  },
  next: {
    gridArea: 'next',
  },
  prev: {
    gridArea: 'prev',
  },
}));

type DevlogPostProps = DevlogFullData & {
  next?: DevlogFullData;
  prev?: DevlogFullData;
  project: {
    slug: string;
    title: string;
  };
};

function DevlogPost(props: DevlogPostProps) {
  const { body, title, mainImage, createdAt, project } = props;
  const styles = useStyles(props);

  return (
    <Container
      component="article"
      maxWidth="md"
      className={styles.root}
      style={{ marginTop: mainImage ? 0 : 64 }}
    >
      {mainImage && (
        <animated.div className={styles.mainImageContainer}>
          <GatsbyImage className={styles.mainImage} fluid={mainImage.fluid} />
        </animated.div>
      )}
      <div className={styles.mainContent}>
        <Typography variant="h1" className={styles.title}>
          {title}
        </Typography>
        <aside className={styles.metaContent}>
          {createdAt && (
            <div className={styles.createdAt}>
              {differenceInDays(new Date(createdAt), new Date()) > 3
                ? distanceInWords(new Date(createdAt), new Date())
                : format(new Date(createdAt), 'MMMM Do, YYYY')}
            </div>
          )}
        </aside>
        {body && <RichText source={body} />}
      </div>
      <Box className={styles.adjacentPosts}>
        {props.prev && (
          <Box className={styles.prev}>
            <Typography variant="h5" gutterBottom>
              Previous post
            </Typography>
            <PreviewCard previewable={devlogToPreviewable(props.prev)} />
          </Box>
        )}
        {props.next && (
          <Box className={styles.next}>
            <Typography variant="h5" gutterBottom>
              Next post
            </Typography>
            <PreviewCard previewable={devlogToPreviewable(props.next)} />
          </Box>
        )}
      </Box>
      <Box mt={3}>
        <Link to={`/portfolio/${project.slug}`}>Back to project home</Link>
      </Box>
    </Container>
  );
}

export default DevlogPost;