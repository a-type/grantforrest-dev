import * as React from 'react';
import { TypographyProps, Typography, useTheme } from '@material-ui/core';
import { AmbientContext } from 'react-ambient';

export function BackgroundSyncText(props: TypographyProps) {
  const ambientCtx = React.useContext(AmbientContext);

  const theme = useTheme();

  const color =
    (ambientCtx && ambientCtx.activeData && ambientCtx.activeData.foreground) ||
    theme.palette.text.primary;

  return <Typography {...props} style={{ ...props.style, color }} />;
}
