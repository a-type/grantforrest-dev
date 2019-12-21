import { format, distanceInWords, differenceInDays } from 'date-fns';
import * as React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import { BlogPostFullData } from '../fragments';
import GatsbyImage from 'gatsby-image';
import RichText from './RichText';

const useStyles = makeStyles(theme => ({
  root: {},
  mainImage: {
    display: 'block',
    position: 'relative',
    background: theme.palette.grey[50],
    paddingBottom: 'calc(9 / 16 * 100%)',
    maxHeight: '80vh',
    overflow: 'hidden',

    '& img': {
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      verticalAlign: 'top',
      objectFit: 'cover',
    },
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
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  metaContent: {
    alignSelf: 'start',
    [theme.breakpoints.up('md')]: {
      borderLeft: `1px solid ${theme.palette.grey[200]}`,
      paddingLeft: theme.spacing(2),
    },
  },
  createdAt: {
    margin: '2rem 0 3rem',
    color: theme.palette.grey[500],
  },
  categories: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
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
}));

type BlogPostProps = BlogPostFullData;

function BlogPost(props: BlogPostProps) {
  const { body, title, mainImage, createdAt } = props;
  const styles = useStyles(props);

  return (
    <article className={styles.root}>
      {mainImage && (
        <div className={styles.mainImage}>
          <GatsbyImage fluid={mainImage.fluid} />
        </div>
      )}
      <Container style={{ marginTop: mainImage ? 0 : 64 }}>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <Typography variant="h1" className={styles.title}>
              {title}
            </Typography>
            {body && <RichText source={body} />}
          </div>
          <aside className={styles.metaContent}>
            {createdAt && (
              <div className={styles.createdAt}>
                {differenceInDays(new Date(createdAt), new Date()) > 3
                  ? distanceInWords(new Date(createdAt), new Date())
                  : format(new Date(createdAt), 'MMMM Do, YYYY')}
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}

export default BlogPost;
