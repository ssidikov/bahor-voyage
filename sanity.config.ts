import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { author, blogCategory, blogPost } from './sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: [author, blogCategory, blogPost],
  },
});
