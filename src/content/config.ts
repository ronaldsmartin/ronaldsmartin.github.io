import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string().default("Ronald Martin"),
    date: z.coerce.date(),
    description: z.string().default(""),
    categories: z.array(z.string()).default([]),
    featured: z.string().default(""),
    featuredalt: z.string().default(""),
    featuredpath: z.string().default(""),
    type: z.string().default("post"),
  }),
});

export const collections = {
  blog: blogCollection,
};
