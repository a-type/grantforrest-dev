import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { RichTextData } from '../types';
import RichText from './RichText';

export type PostBodyProps = {
  body: RichTextData;
};

const useStyles = makeStyles<Theme, PostBodyProps>((theme) => ({}));

export function PostBody(props: PostBodyProps) {
  const classes = useStyles(props);
  const { body } = props;

  return <RichText source={body} />;
}
