import type { PublicCourse } from './api';
import { slugify } from './utils';

export const FEATURED_PRIMEROS_AUXILIOS_COURSE: PublicCourse = {
  course_id: 13,
  title: 'Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes',
  slug: 'primeros-auxilios-y-respuesta-rapida-ante-emergencias-comunes',
  description:
    'Las emergencias domésticas, laborales y en la vía pública ocurren con frecuencia, y los primeros minutos son decisivos. Este curso capacita a personas sin formación sanitaria para evaluar una escena con seguridad, activar la cadena de ayuda, brindar atención inicial y actuar con rapidez en situaciones comunes hasta la llegada de personal especializado.',
  short_description:
    'Capacitación teórica y práctica (3 meses / 12 semanas, todos los sábados) para evaluar escenas de emergencia, controlar signos vitales, atender traumatismos, hemorragias, inyectables, amagos de incendio y ejecutar RCP/DEA y maniobra de Heimlich.',
  price: 0,
  certificate_included: true,
  certificate_price: null,
  thumbnail_url: '/images/flyers/primeros-auxilios-emergencias-2027-banner.png',
  program_type: 'course',
  delivery_mode: 'hybrid',
  target_audience: 'Público en general',
  total_academic_hours: 50,
  synchronous_hours: 36,
  complementary_hours: 14,
  theory_hours: 19,
  practice_hours: 31,
  duration_weeks: 12,
  recommended_frequency: '1 sesión semanal, los días sábados (3 horas académicas por sesión)',
  min_passing_grade: 14,
  min_attendance_percent: 80,
  published_at: '2027-01-15T14:00:00.000Z',
  teachers: [
    {
      name: 'Lic. Juan Vicente',
      last_name: 'Velázquez Magallanes',
      profession: 'Licenciado en Enfermería (CEP 101694) · Diplomado en Cuidados Intensivos Adultos y Auditoría en Salud',
      specialty: 'MINSA - DIRIS Lima Sur · Comité de Emergencias y Desastres CEP CR-III · Instructor BLS y OVACE',
      profile_photo_url: '/images/team/juan-velazquez.jpeg',
    },
  ],
};

function sortAndEnsureFeaturedCourses(courses: PublicCourse[]): PublicCourse[] {
  const hasFeatured = courses.some(
    (c) =>
      Number(c.course_id) === 13 ||
      slugify(c.slug || '') === FEATURED_PRIMEROS_AUXILIOS_COURSE.slug,
  );

  const list = hasFeatured
    ? courses.map((c) =>
        Number(c.course_id) === 13 ||
        slugify(c.slug || '') === FEATURED_PRIMEROS_AUXILIOS_COURSE.slug
          ? {
              ...FEATURED_PRIMEROS_AUXILIOS_COURSE,
              ...c,
              thumbnail_url:
                c.thumbnail_url || FEATURED_PRIMEROS_AUXILIOS_COURSE.thumbnail_url,
              teachers:
                Array.isArray(c.teachers) && c.teachers.length > 0
                  ? c.teachers
                  : FEATURED_PRIMEROS_AUXILIOS_COURSE.teachers,
            }
          : c,
      )
    : [FEATURED_PRIMEROS_AUXILIOS_COURSE, ...courses];

  return [...list].sort((a, b) => {
    const aIsFeatured =
      Number(a.course_id) === 13 ||
      slugify(a.slug || '') === FEATURED_PRIMEROS_AUXILIOS_COURSE.slug;
    const bIsFeatured =
      Number(b.course_id) === 13 ||
      slugify(b.slug || '') === FEATURED_PRIMEROS_AUXILIOS_COURSE.slug;
    if (aIsFeatured && !bIsFeatured) return -1;
    if (!aIsFeatured && bIsFeatured) return 1;

    const aTime = a.published_at ? new Date(a.published_at).getTime() : 0;
    const bTime = b.published_at ? new Date(b.published_at).getTime() : 0;
    if (bTime !== aTime) return bTime - aTime;
    return Number(b.course_id) - Number(a.course_id);
  });
}

export async function getPublishedCourses(): Promise<PublicCourse[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  try {
    const response = await fetch(`${baseUrl}/courses`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [FEATURED_PRIMEROS_AUXILIOS_COURSE];
    const body = await response.json();
    const raw = Array.isArray(body?.data) ? body.data : [];
    return sortAndEnsureFeaturedCourses(raw);
  } catch {
    return [FEATURED_PRIMEROS_AUXILIOS_COURSE];
  }
}

// Match against either course.slug or slugify(course.title).
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
  return (
    courses.find(
      (course) =>
        slugify(course.slug || '') === target ||
        slugify(course.title) === target,
    ) ?? null
  );
}

