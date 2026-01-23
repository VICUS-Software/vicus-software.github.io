import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    lang: z.enum(['de', 'en']),
    draft: z.boolean().optional().default(false),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    author: z.string().optional().default('VICUS Team'),
    tags: z.array(z.string()).optional().default([]),
    lang: z.enum(['de', 'en']),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  pages: pagesCollection,
  blog: blogCollection,
};
