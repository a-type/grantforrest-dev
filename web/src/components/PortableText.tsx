import * as React from 'react';
// @ts-ignore
import clientConfig from '../../clientConfig';
import BasePortableText from '@sanity/block-content-to-react';
import serializers from './serializers';

const PortableText = ({ blocks }: { blocks: any }) => (
  <BasePortableText blocks={blocks} serializers={serializers} {...clientConfig.sanity} />
);

export default PortableText;
