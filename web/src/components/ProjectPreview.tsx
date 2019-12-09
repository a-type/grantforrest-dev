import * as React from 'react';
import {
  makeStyles,
  Typography,
  Button,
  Paper,
  Theme,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { imageUrlFor } from '../lib/imageUrl';
import { buildImageObj, getPortfolioUrl, getPortfolioElementId } from '../lib/helpers';
import PortableText from './PortableText';
import { ProjectPreviewData } from '../pages';
import Link from './Link';
import clsx from 'clsx';
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import IntersectionObserver from 'inteobs';

export type ProjectPreviewProps = {
  project: ProjectPreviewData;
  className?: string;
  imageWidth: number;
  side?: 'left' | 'right';
};

const useStyles = makeStyles<Theme, ProjectPreviewProps>(theme => ({
  root: {
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textDecoration: 'none',
    cursor: 'pointer',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  content: props => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: 400,
    position: 'relative',
    zIndex: 1,
    marginTop: 'auto',
    marginLeft: 0,
    marginRight: 0,

    [theme.breakpoints.up('sm')]: {
      marginBottom: 'auto',
      marginLeft: props.side === 'left' ? 0 : 'auto',
      marginRight: props.side === 'left' ? 'auto' : 0,
    },
    // bottom: theme.spacing(2),
    // left: theme.spacing(2),
    // right: theme.spacing(2),
    // [theme.breakpoints.up('sm')]: {
    //   top: '50%',
    //   left: props.side === 'left' ? '33%' : '66%',
    //   right: 'auto',
    //   transform: 'translate(-50%, -50%)',
    // },
  }),
  expandingImage: {
    position: 'absolute',
    transform: `translate(-50%, -50%)`,
    top: '50%',
    backgroundSize: 'cover',
  },
}));

export const ProjectPreview: React.FC<ProjectPreviewProps> = props => {
  const { project, className, side = 'right' } = props;
  const classes = useStyles(props);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('sm'));

  const imageSrc =
    project.mainImage &&
    imageUrlFor(buildImageObj(project.mainImage))
      .width(props.imageWidth)
      .height(Math.floor((9 / 16) * props.imageWidth))
      .auto('format')
      .url();

  const [isInFrame, setIsInFrame] = React.useState(false);

  const intersectionObserverRef = React.useRef(
    new IntersectionObserver(
      (entries: any[]) => {
        entries.forEach((entry: any) => {
          setIsInFrame(entry.isIntersecting);
        });
      },
      {
        threshold: 0.7,
      },
    ),
  );

  const [[rootWidth, rootHeight], setRootSize] = React.useState([0, 0]);
  const rootRef = (el: HTMLElement) => {
    if (el) {
      setRootSize([el.clientWidth, el.clientHeight]);
      intersectionObserverRef.current.disconnect();
      intersectionObserverRef.current.observe(el);
    }
  };

  const { imageLeft, imageBorderRadius, imageWidth, imageHeight } = useSpring(
    isInFrame
      ? {
          imageLeft: '50%',
          imageBorderRadius: '0',
          imageWidth: rootWidth,
          imageHeight: rootHeight,
        }
      : {
          imageLeft: isLarge ? (side === 'right' ? '33%' : '66%') : '50%',
          imageBorderRadius: '100%',
          imageWidth: rootHeight / 2,
          imageHeight: rootHeight / 2,
        },
  );

  return (
    <Link
      underline="never"
      color="inherit"
      to={getPortfolioUrl(project.publishedAt, project.slug)}
      className={clsx(classes.root, className)}
      id={getPortfolioElementId(project.publishedAt, project.slug)}
      ref={rootRef as any}
    >
      <Paper className={classes.content} elevation={4}>
        <Typography variant="h2" gutterBottom>
          {project.title}
        </Typography>
        <PortableText blocks={project._rawExcerpt} />
        <Button color="inherit">View project</Button>
      </Paper>
      <animated.div
        className={classes.expandingImage}
        style={{
          backgroundImage: `url(${imageSrc})`,
          left: imageLeft,
          borderRadius: imageBorderRadius,
          width: imageWidth,
          height: imageHeight,
        }}
      />
    </Link>
  );
};
