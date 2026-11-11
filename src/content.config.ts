// Describes the content files the site is built from.
// Each project is one Markdown file in src/content/projects/,
// and its photos live in src/assets/photos/<project-name>/.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One line shown on the home page under the cover.
      summary: z.string(),
      // Lower numbers come first on the home page.
      order: z.number().default(99),
      // Set to true to hide a project while you work on it.
      draft: z.boolean().default(false),
      year: z.string().optional(),
      place: z.string().optional(),
      // An optional short line shown beside a photo on the project page.
      note: z.string().optional(),
      cover: image(),
      coverAlt: z.string(),
      // Which part of the cover stays visible when it is cropped, e.g. "50% 50%".
      coverPosition: z.string().default('50% 50%'),
      photos: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            title: z.string().optional(),
            caption: z.string().optional(),
            // auto = the page decides; full = whole width; half = side by side.
            size: z.enum(['auto', 'full', 'half']).default('auto'),
          }),
        )
        .min(1),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      heading: z.string().optional(),
      // Small gold line above the heading (home page).
      eyebrow: z.string().optional(),
      intro: z.string().optional(),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      heroPosition: z.string().default('50% 50%'),
      // Project the home page photo comes from (its file name, e.g. "quiet-metropolis").
      heroProject: z.string().optional(),
      summary: z.string().optional(),
      services: z
        .array(z.object({ title: z.string(), text: z.string() }))
        .default([]),
    }),
});

export const collections = { projects, pages };
