import { ComponentPropsWithRef } from 'react';
import { styled } from 'stitches.config';

export const ButtonBase = styled('button', {
  $$bg: '$colors$white',
  $$fg: '$colors$black',
  $$bgHover: '$colors$gray',
  $$focus: '$colors$black',

  px: '$6',
  py: '$3',
  font: '$default',
  fontSize: '$b1',
  fontWeight: '$b1',
  lineHeight: '$b1',
  color: '$$fg',
  backgroundColor: '$$bg',
  borderRadius: '$content',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  focusRing: 'none',
  cursor: 'pointer',

  transitionEase: 'background-color, color, box-shadow',

  '&:hover': {
    backgroundColor: '$$bgHover',
  },

  '&:focus': {
    focusRing: '$$focus',
    backgroundColor: '$$bgHover',
    outline: 'none',
  },

  '&:active': {
    focusRing: '$$focus',
    outline: 'none',
  },

  '&:disabled': {
    backgroundColor: '$slateLight',
    color: '$slateInk',
  },

  // loading styles are white with border, unless icon is present.
  '&[data-loading="true"]:not([data-icon="true"])': {
    backgroundColor: '$snow',
    focusRing: '$slateBold',
    color: '$slateInk',
  },

  // remove some start padding to fit icon
  '&[data-icon="true"]': {
    pl: '$3',
  },

  variants: {
    color: {
      ghost: {
        $$bg: 'transparent',
        $$fg: 'inherit',
        $$bgHover: '$colors$dimmer',
        $$focus: '$colors$dim',
        '&:disabled': {
          backgroundColor: '$dim',
          color: '$slateInk',
        },
      },
      primary: {
        $$bg: '$colors$cherryBold',
        $$fg: '$colors$snow',
        $$bgHover: '$colors$cherryLight',
        $$focus: '$colors$cherryRegular',
      },
    },
  },

  defaultVariants: {
    color: 'primary',
  },
});

export type ButtonBaseProps = ComponentPropsWithRef<typeof ButtonBase>;
