/**
 * JsonLd — injects JSON-LD structured data into the page <head>.
 *
 * Usage (Server Component):
 *   import JsonLd from "@/components/JsonLd";
 *   <JsonLd data={schema} />
 *
 * Google uses JSON-LD to power Rich Results (sitelinks, breadcrumbs,
 * article cards, etc.) in search. Zero client-side JavaScript cost.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static, safe structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
