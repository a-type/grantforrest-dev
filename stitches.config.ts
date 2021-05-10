import { BODY_FONT, TITLE_FONT } from '@constants/fonts';
import { createCss, StitchesCss } from '@stitches/react';

export const stitchesConfig = createCss({
  theme: {
    colors: {
      black: 'black',
      white: 'white',
      gray: 'gray',
    },
    space: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '64px',
      6: '128px',
      7: '256px',
      8: '512px',
    },
    sizes: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '64px',
      6: '128px',
      7: '256px',
      8: '512px',
    },
    fonts: {
      title: TITLE_FONT,
      body: BODY_FONT,
      mono: 'monospace',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '72px',
    },
    lineHeights: {
      1: '18px',
      2: '21px',
      3: '24px',
      4: '30px',
      5: '36px',
      6: '48px',
      7: '72px',
      8: '96px',
      9: '108px',
    },
    radii: {
      1: '2px',
      2: '4px',
      3: '8px',
      round: '9999px',
    },
  },
  media: {
    bp1: '(min-width: 575px)',
    bp2: '(min-width: 750px)',
    bp3: '(min-width: 1000px)',
    bp4: '(min-width: 1200px)',
  },
  utils: {
    // Abbreviated margin properties
    m: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      marginTop: value,
    }),
    mr: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      marginRight: value,
    }),
    mb: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      marginBottom: value,
    }),
    ml: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      marginLeft: value,
    }),
    mx: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      marginTop: value,
      marginBottom: value,
    }),

    // Abbreviated padding properties
    p: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      paddingTop: value,
    }),
    pr: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      paddingRight: value,
    }),
    pb: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      paddingBottom: value,
    }),
    pl: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      paddingLeft: value,
    }),
    px: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (config) => (
      value: `$${keyof typeof config['theme']['space'] | (string & {})}`,
    ) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    // A property to apply linear gradient
    linearGradient: (config) => (value) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    // An abbreviated property for border-radius
    br: (config) => (value: number) => ({
      borderRadius: value,
    }),

    // background color
    bc: (config) => (
      value: `$${keyof typeof config['theme']['colors'] | (string & {})}`,
    ) => ({ backgroundColor: value }),
  },
});

export type CSS = StitchesCss<typeof stitchesConfig>;

export const { styled, css, keyframes, getCssString, global } = stitchesConfig;
