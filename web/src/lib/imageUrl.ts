import clientConfig from '../../clientConfig';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(clientConfig.sanity);

export function imageUrlFor(source) {
  return builder.image(source);
}
