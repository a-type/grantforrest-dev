import { format, distanceInWords, differenceInDays } from 'date-fns';
import * as React from 'react';
import {
  makeStyles,
  Container,
  Typography,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { BlogPostFullData } from '../fragments';
import GatsbyImage from 'gatsby-image';
import RichText from './RichText';
import { useSpring, animated } from '@react-spring/web';

const useStyles = makeStyles(theme => ({
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
    background: theme.palette.grey[50],
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
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  metaContent: {
    alignSelf: 'start',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
    [theme.breakpoints.up('md')]: {
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      marginBottom: theme.spacing(1),
    },
  },
  createdAt: {
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

const sixteenNine = (8.0 / 16.0) * 100;
const twoFour = (4.0 / 2.0) * 100;

function BlogPost(props: BlogPostProps) {
  const { body, title, mainImage, createdAt } = props;
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
    </Container>
  );
}

export default BlogPost;
