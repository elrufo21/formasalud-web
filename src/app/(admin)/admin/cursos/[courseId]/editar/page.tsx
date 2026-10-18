"use client";

import { useParams } from "next/navigation";
import { CourseCreateForm } from "@/features/admin/components/CourseCreateForm";

export default function EditCoursePage() {
  const params = useParams<{ courseId: string }>();
  const courseId = Number(params.courseId);
  if (!Number.isSafeInteger(courseId) || courseId <= 0) {
    return <div className="p-8 text-sm text-red-600">El identificador del curso no es válido.</div>;
  }
  return <CourseCreateForm courseId={courseId} />;
}
