// src/app/courses/[course_slug]/layout.js

export async function generateMetadata({ params }) {
  const { course_slug } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/course/${course_slug}`,
      { cache: "no-store" }
    );

    const json = await res.json();
    const course = json?.data || json;

    const title =
      course?.meta_title || `${course?.course_name || "Course"} | Ideal Education`;

    const description =
      course?.meta_description ||
      course?.course_description ||
      `Explore ${course?.course_name || "our course"} at Ideal Education.`;

    const keywords =
      course?.meta_keywords ||
      `${course?.course_name || "course"}, Ideal Education, coaching, classes`;

    return { title, description, keywords };
  } catch (e) {
    return {
      title: "Courses | Ideal Education",
      description: "Explore our courses at Ideal Education.",
    };
  }
}

export default function Layout({ children }) {
  return <>{children}</>;  // ✅ must return JSX
}
