import { getCollection } from 'astro:content';

/** Site base path without a trailing slash, e.g. "/doing-economics". Prefix internal links with this. */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** All published (non-draft) projects, sorted by `order`. */
export async function getProjects() {
  const projects = await getCollection('projects', p => !p.data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}
