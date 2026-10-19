import type { PublicCourse } from './api';
import { slugify } from './utils';

export async function getPublishedCourses(): Promise<PublicCourse[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  try {
    const response = await fetch(`${baseUrl}/courses`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const body = await response.json();
    return Array.isArray(body?.data) ? body.data : [];
  } catch {
    return [];
  }
}

// The backend has no lookup by title-based slug, so match against the published list.
export async function getPublishedCourseBySlug(slug: string): Promise<PublicCourse | null> {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // keep the raw value if it isn't valid percent-encoding
  }
  const target = slugify(decoded); // also accepts accented URLs like /cursos/práctica-clínica
  if (!target) return null;
  const courses = await getPublishedCourses();
  return courses.find((course) => slugify(course.title) === target) ?? null;
}
