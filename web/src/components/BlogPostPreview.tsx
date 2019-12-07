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
import { buildImageObj, getBlogUrl } from '../lib/helpers';
import { imageUrlFor } from '../lib/imageUrl';
import PortableText from './PortableText';
import { format } from 'date-fns';

export interface BlogPostPreviewProps {
  title: string;
  _rawExcerpt: string;
  mainImage: any; // todo
  publishedAt: Date;
  slug: any; // todo
}

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    paddingBottom: `${(9 / 16) * 100}%`,
  },
}));

const BlogPostPreview: React.FC<BlogPostPreviewProps> = props => {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Link}
        to={getBlogUrl(props.publishedAt, props.slug.current)}
        underline="none"
        color="inherit"
      >
        {props.mainImage && props.mainImage.asset && (
          <CardMedia
            className={classes.image}
            image={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .auto('format')
              .url()}
            title={props.mainImage.alt}
          />
        )}
        <CardHeader title={props.title} subheader={format(props.publishedAt, 'MMMM Do, YYYY')} />
        <CardContent>
          <PortableText blocks={props._rawExcerpt} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogPostPreview;
