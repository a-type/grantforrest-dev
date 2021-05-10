import { global } from 'stitches.config';

export const globalStyles = global({
  body: {
    backgroundColor: '$white',
    color: '$black',
    fontFamily: '$body',
    margin: 0,
  },

  ul: {
    paddingLeft: '$4',
  },

  figure: { margin: 0 },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  svg: { display: 'inline-block', verticalAlign: 'middle' },
});
