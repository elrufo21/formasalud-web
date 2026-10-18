import { TeacherForm } from "@/features/admin/components/TeacherForm";

export default async function EditTeacherPage({
  params,
}: {
  params: Promise<{ teacherId: string }>;
}) {
  const { teacherId } = await params;
  const id = Number(teacherId);
  if (!Number.isInteger(id) || id <= 0)
    return (
      <div className="p-8 text-sm text-red-700">
        El identificador del docente no es válido.
      </div>
    );
  return <TeacherForm teacherId={id} />;
}
