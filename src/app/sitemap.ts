import { MetadataRoute } from "next";
import { getPublishedCourses } from "@/lib/public-courses";
import { slugify } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.formasalud.org.pe";
  const courses = await getPublishedCourses();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cursos`,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/quienes-somos`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/verificar`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/registro`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/login`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const seenSlugs = new Set<string>();
  const courseRoutes: MetadataRoute.Sitemap = [];

  for (const course of courses) {
    const courseSlug = course.slug || slugify(course.title);
    if (!courseSlug || seenSlugs.has(courseSlug)) continue;
    seenSlugs.add(courseSlug);

    const isFeatured =
      Number(course.course_id) === 13 ||
      courseSlug.includes("primeros-auxilios-y-respuesta-rapida");

    courseRoutes.push({
      url: `${baseUrl}/cursos/${courseSlug}`,
      changeFrequency: "weekly",
      priority: isFeatured ? 0.95 : 0.85,
    });
  }

  return [...staticRoutes, ...courseRoutes];
}
