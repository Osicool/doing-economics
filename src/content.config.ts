import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    topic: z.string(),
    level: z.enum(['Introductory', 'Intermediate', 'Advanced']).default('Introductory'),
    tools: z.array(z.string()).default(['Excel', 'R', 'Python']),
    dataset: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
