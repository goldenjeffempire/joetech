import { build } from "vite";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { getPublicRoutePaths, getRouteMeta, injectSSRMeta } from "../server/seo-meta";

async function buildStatic() {
  // A static deployment must never include a server bundle from an earlier build.
  await rm("dist", { recursive: true, force: true });
  await build();

  const output = path.resolve("dist/public");
  const template = await readFile(path.join(output, "index.html"), "utf8");
  const routes = getPublicRoutePaths();
  for (const route of routes) {
    const directory = route === "/" ? output : path.join(output, route.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), injectSSRMeta(template, getRouteMeta(route)));
  }

  const base = getRouteMeta("/").canonical.replace(/\/$/, "");
  const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const urls = routes.map((route) => `  <url><loc>${escapeXml(getRouteMeta(route).canonical)}</loc></url>`).join("\n");
  await writeFile(path.join(output, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile(path.join(output, "sitemap-images.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${base}/</loc><image:image><image:loc>${base}/og-image.png</image:loc></image:image></url>
  <url><loc>${base}/about</loc><image:image><image:loc>${base}/jeffery.jpg</image:loc></image:image></url>
</urlset>\n`);
  console.log(`Static build complete: ${routes.length} pages with route-specific SEO, robots, and sitemaps.`);
}

buildStatic().catch((error) => {
  console.error(error);
  process.exit(1);
});
