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
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cursos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/quienes-somos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/verificar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
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
      lastModified: course.published_at ? new Date(course.published_at) : new Date(),
      changeFrequency: "weekly",
      priority: isFeatured ? 0.95 : 0.85,
    });
  }

  return [...staticRoutes, ...courseRoutes];
}
