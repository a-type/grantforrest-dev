import * as React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import Link from './Link';
import { getBlogUrl } from '../lib/helpers';
import { format } from 'date-fns';
import { BlogPostPreviewData } from '../fragments';
import RichText from './RichText';
import GatsbyImage from 'gatsby-image';

export type BlogPostPreviewProps = BlogPostPreviewData;

const useStyles = makeStyles(() => ({
  root: {},
  cardMedia: {},
}));

const BlogPostPreview: React.FC<BlogPostPreviewProps> = props => {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={getBlogUrl(props.slug)} underline="none" color="inherit">
        {props.mainImage && (
          <CardMedia className={classes.cardMedia}>
            <GatsbyImage alt={props.mainImage.description} fluid={props.mainImage.fluid} />
          </CardMedia>
        )}
        <CardHeader title={props.title} subheader={format(props.createdAt, 'MMMM Do, YYYY')} />
        <CardContent>
          <RichText source={props.excerpt} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogPostPreview;
