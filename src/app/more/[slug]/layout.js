import { baseUrl } from "@/services/baseUrl";

export async function generateMetadata({ params }) {
  // 🔑 params is now async
  const { slug } = await params;

  let pageData = null;

  try {
    const res = await fetch(
      `${baseUrl}custom_page?page_slug=${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const json = await res.json();
    pageData = json?.data?.list?.[0] ?? null;
  } catch (err) {
    console.error("SEO fetch failed:", err);
  }

  return {
    title: pageData?.meta_title || "Your Brand Name",
    description:
      pageData?.meta_description ||
      "Default SEO description for your website.",
    keywords:
      pageData?.meta_keyword ||
      "default, keywords, here",
  };
}

/** REQUIRED */
export default function MoreLayout({ children }) {
  return <>{children}</>;
}
