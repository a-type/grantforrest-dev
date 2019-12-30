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
import { getPortfolioUrl, getPortfolioElementId } from '../lib/helpers';
import { ProjectPreviewData } from '../fragments';
import Link from './Link';
import clsx from 'clsx';
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import IntersectionObserver from 'inteobs';
import RichText from './RichText';
import Img, { FluidObject } from 'gatsby-image';

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
      marginLeft: props.side === 'left' ? theme.spacing(4) : 'auto',
      marginRight: props.side === 'left' ? 'auto' : theme.spacing(4),
    },
  }),
  expandingImage: {
    position: 'absolute',
    transform: `translate(-50%, -50%)`,
    top: '50%',
    backgroundSize: 'cover',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius * 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
}));

export const ProjectPreview: React.FC<ProjectPreviewProps> = props => {
  const { project, className, side = 'right' } = props;
  const classes = useStyles(props);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('sm'));

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

  const { imageLeft, imageWidth, imageHeight } = useSpring(
    isInFrame
      ? {
          imageLeft: '50%',
          // imageBorderRadius: '0',
          imageWidth: rootWidth - theme.spacing(8),
          imageHeight: rootHeight,
        }
      : {
          imageLeft: isLarge ? (side === 'right' ? '33%' : '66%') : '50%',
          // imageBorderRadius: '100%',
          imageWidth: rootHeight / 2,
          imageHeight: rootHeight / 2,
        },
  );

  return (
    <Link
      underline="never"
      color="inherit"
      to={getPortfolioUrl(project.slug)}
      className={clsx(classes.root, className)}
      id={getPortfolioElementId(project.slug)}
      ref={rootRef as any}
    >
      <Paper className={classes.content} elevation={isInFrame ? 4 : 0}>
        <Typography variant="h2" gutterBottom>
          {project.title}
        </Typography>
        <RichText source={project.summary} />
        <Button color="inherit">View project</Button>
      </Paper>
      <animated.div
        className={classes.expandingImage}
        style={{
          //backgroundImage: `url(${imageSrc})`,
          left: imageLeft,
          // borderRadius: imageBorderRadius,
          width: imageWidth,
          height: imageHeight,
        }}
      >
        <Img
          fluid={project.mainImage.fluid}
          alt={project.mainImage.description}
          className={classes.image}
          imgStyle={{ objectFit: 'cover' }}
        />
      </animated.div>
    </Link>
  );
};
