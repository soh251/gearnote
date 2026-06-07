import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'electric-guitar',
      'acoustic-guitar',
      'effector',
      'amp',
      'dtm',
      'beginners-guide',
    ]),
    publishedAt: z.string(),
    rating: z.number().min(1).max(5).optional(),
    thumbnail: z.string().optional(),
    featured: z.boolean().optional().default(false),
    products: z
      .array(
        z.object({
          name: z.string(),
          price: z.string(),
          amazonUrl: z.string().optional(),
          soundhouseUrl: z.string().optional(),
          ikebeUrl: z.string().optional(),
          ishibashiUrl: z.string().optional(),
          image: z.string().optional(),
          specs: z.record(z.string()).optional(),
        })
      )
      .optional(),
  }),
});

export const collections = { articles };
