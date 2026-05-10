import { useEffect } from "react";

const BASE_URL = "https://joetechnologies.io";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = "JOE Technologies";

export interface SeoConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  schema?: object | object[];
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, id: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setPageSchema(schema: object | object[] | undefined) {
  const SCRIPT_ID = "page-seo-schema";
  let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!schema) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = SCRIPT_ID;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema, null, 0);
}

export function useSeo({ title, description, canonical, ogImage, noindex, schema }: SeoConfig) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : title === "Home"
      ? `${SITE_NAME} — Apps, Websites, Automation, UI/UX & AI Solutions`
      : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    const ogImageUrl = ogImage ?? DEFAULT_OG_IMAGE;

    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setLink("canonical", canonicalUrl, "canonical");

    setMeta("og:type", "website", "property");
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", ogImageUrl, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:site_name", SITE_NAME, "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImageUrl);

    setPageSchema(schema);

    return () => {
      setPageSchema(undefined);
    };
  }, [title, description, canonical, ogImage, noindex, schema]);
}
