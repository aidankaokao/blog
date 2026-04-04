import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
