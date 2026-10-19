import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailView } from "@/features/courses/components/CourseDetailView";
import { getPublishedCourseBySlug } from "@/lib/public-courses";

export const revalidate = 60;

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getPublishedCourseBySlug(slug);
  if (!course) return { title: "Curso no encontrado — FORMASALUD" };
  return {
    title: `${course.title} — FORMASALUD`,
    description: course.short_description || course.description || undefined,
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getPublishedCourseBySlug(slug);
  if (!course) notFound();
  return <CourseDetailView course={course} />;
}
