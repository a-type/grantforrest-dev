import { format, distanceInWords, differenceInDays } from 'date-fns';
import * as React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/imageUrl';
import PortableText from './PortableText';
import AuthorList from './AuthorList';
import { makeStyles, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  mainImage: {
    display: 'block',
    position: 'relative',
    background: theme.palette.grey[50],
    paddingBottom: 'calc(9 / 16 * 100%)',

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
  publishedAt: {
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

type BlogPostProps = {
  _rawBody: string;
  authors: any[]; // todo
  categories: any[]; // todo
  title: string;
  mainImage: any; // todo
  publishedAt: string;
};

function BlogPost(props: BlogPostProps) {
  const { _rawBody, authors, categories, title, mainImage, publishedAt } = props;
  const styles = useStyles(props);

  return (
    <article className={styles.root}>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .auto('format')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <Typography variant="h1" className={styles.title}>
              {title}
            </Typography>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do, YYYY')}
              </div>
            )}
            {authors && <AuthorList items={authors} title="Authors" />}
            {categories && (
              <div className={styles.categories}>
                <Typography variant="h3" className={styles.categoriesHeadline}>
                  Categories
                </Typography>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}

export default BlogPost;
