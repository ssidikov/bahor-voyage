import { createImageUrlBuilder } from '@sanity/image-url';

import { sanityClient } from './sanity';

const builder = createImageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: Record<string, any>) {
  return builder.image(source);
}
