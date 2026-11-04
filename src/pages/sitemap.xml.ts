// Keeps the sitemap at /sitemap.xml, the address already submitted to Google Search Console.
import type { APIRoute } from 'astro';
import { getProjects } from '../lib/projects';
import { url } from '../lib/url';

export const GET: APIRoute = async ({ site }) => {
  const today = new Date().toISOString().slice(0, 10);
  const paths = ['/', '/about/', ...(await getProjects()).map((p) => `/${p.id}/`)];
  const urls = paths
    .map((p) => `  <url><loc>${new URL(url(p), site)}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
