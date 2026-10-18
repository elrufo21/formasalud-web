import type { PublicCourse } from './api';

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
