import Link from './Link';
import * as React from 'react';
import BlogPostPreview from './BlogPostPreview';
import { makeStyles, Grid, Button } from '@material-ui/core';

type BlogPostPreviewGridProps = {
  title: string;
  nodes: any[];
  browseMoreHref: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: '2em 0 4em',
  },
  headline: {
    fontSie: '12px',
    lineHeight: 1,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '2rem 0',
  },
  grid: {},
  browseMoreNav: {
    marginTop: '2rem',
    textAlign: 'center',
  },
}));

function BlogPostPreviewGrid(props: BlogPostPreviewGridProps) {
  const styles = useStyles(props);

  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      <Grid container spacing={4} className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <Grid item lg={4} md={6} sm={12} key={node.id}>
              <BlogPostPreview {...node} />
            </Grid>
          ))}
      </Grid>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Button component={Link} underline="none" to={props.browseMoreHref}>
            Archives
          </Button>
        </div>
      )}
    </div>
  );
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default BlogPostPreviewGrid;
