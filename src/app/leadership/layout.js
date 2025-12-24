import { baseUrl } from "@/services/baseUrl";

export async function generateMetadata() {
  try {
    const res = await fetch(`${baseUrl}page-content?page_name=leadership`, {
      cache: "no-store",
    });

    const json = await res.json();
    const list = json?.data?.list || [];

    const metaRow =
      list.find(
        (x) => x?.meta_title || x?.meta_description || x?.meta_keywords
      ) || list[0] || {};

    return {
      title: metaRow?.meta_title || "CSR | Ideal Education",
      description:
        metaRow?.meta_description ||
        "CSR activities and social commitment of Ideal Education",
      keywords: metaRow?.meta_keywords || "",
    };
  } catch (e) {
    return {
      title: "CSR | Ideal Education",
      description:
        "CSR activities and social commitment of Ideal Education",
    };
  }
}

export default function CSRLayout({ children }) {
  return <>{children}</>; // ✅ MUST return JSX
}