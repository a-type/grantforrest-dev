import { global } from 'stitches.config';

export const globalStyles = global({
  body: {
    backgroundColor: '$white',
    color: '$black',
    fontFamily: '$body',
    lineHeight: '$1',
    margin: 0,
    backgroundSize: '$sizes$grid $sizes$grid',
    backgroundPositionX: 'calc($sizes$grid / 2)',
    backgroundPositionY: 'calc($sizes$grid / 2)',
    backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.5) 0.5px, rgba(0, 0, 0, 0) 1px)`,
    overflow: 'overlay',
  },

  '*': {
    boxSizing: 'border-box',
  },

  ul: {
    paddingLeft: '$2',
  },

  figure: { margin: 0 },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  svg: { display: 'inline-block', verticalAlign: 'middle' },
});
