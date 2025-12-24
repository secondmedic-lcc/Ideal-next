import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutUsClient from "./AboutUsClient";
import { baseUrl } from "@/services/baseUrl";

export async function generateMetadata() {
  try {
    const res = await fetch(`${baseUrl}page-content?page_name=about-us`, {
      cache: "no-store",
    });
    const json = await res.json();

    const list = json?.data?.list || [];
    const metaRow = list.find((x) => x?.meta_title || x?.meta_description || x?.meta_keywords) || list[0] || {};

    const title = metaRow?.meta_title || "About Us";
    const description = metaRow?.meta_description || "About Us page";
    const keywords = metaRow?.meta_keywords || "";

    return {
      title,
      description,
      keywords,
    };
  } catch (e) {
    return {
      title: "About Us",
      description: "About Us page",
    };
  }
}

export default function AboutUsPage() {
  return <AboutUsClient />;
}
