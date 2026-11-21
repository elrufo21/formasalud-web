import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailView } from "@/features/courses/components/CourseDetailView";
import { getPublishedCourseBySlug } from "@/lib/public-courses";
import { getPublicAssetUrl } from "@/lib/api";
import { slugify } from "@/lib/utils";

export const revalidate = 60;

const SITE_URL = "https://www.formasalud.org.pe";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getPublishedCourseBySlug(slug);
  if (!course) return { title: "Curso no encontrado — FORMASALUD" };

  const canonicalSlug = course.slug || slugify(course.title);
  const canonicalUrl = `${SITE_URL}/cursos/${canonicalSlug}`;
  const isPrimerosAuxilios =
    Number(course.course_id) === 13 ||
    canonicalSlug.includes("primeros-auxilios-y-respuesta-rapida");

  const ogImage = isPrimerosAuxilios
    ? `${SITE_URL}/images/flyers/primeros-auxilios-emergencias-2027-banner.png`
    : getPublicAssetUrl(course.thumbnail_url) || `${SITE_URL}/og-image.png`;

  const description =
    course.short_description ||
    course.description ||
    `Programa académico certificado "${course.title}" dictado por especialistas de FORMASALUD en el Perú.`;

  return {
    title: course.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${course.title} | FORMASALUD`,
      description,
      url: canonicalUrl,
      siteName: "FORMASALUD",
      locale: "es_PE",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: `${course.title} — FORMASALUD`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | FORMASALUD`,
      description,
      images: [ogImage],
    },
  };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getPublishedCourseBySlug(slug);
  if (!course) notFound();

  const canonicalSlug = course.slug || slugify(course.title);
  const canonicalUrl = `${SITE_URL}/cursos/${canonicalSlug}`;
  const isPrimerosAuxilios =
    Number(course.course_id) === 13 ||
    canonicalSlug.includes("primeros-auxilios-y-respuesta-rapida");

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cursos y Programas",
            item: `${SITE_URL}/cursos`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: course.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Course",
        name: course.title,
        description:
          course.description ||
          course.short_description ||
          `Curso especializado de FORMASALUD: ${course.title}`,
        url: canonicalUrl,
        inLanguage: "es-PE",
        provider: {
          "@type": "EducationalOrganization",
          name: "FORMASALUD — Innovación y Desarrollo Académico en Salud",
          sameAs: SITE_URL,
        },
        ...(course.total_academic_hours
          ? { timeRequired: `PT${Number(course.total_academic_hours)}H` }
          : {}),
        educationalCredentialAwarded: course.certificate_included
          ? `Certificado de Aprobación a nombre de FormaSalud${
              course.total_academic_hours
                ? ` (${Number(course.total_academic_hours)} horas académicas)`
                : ""
            } con código QR`
          : "Certificado Oficial de Aprobación con código QR",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: isPrimerosAuxilios || course.delivery_mode === "hybrid"
            ? ["onsite", "online"]
            : course.delivery_mode === "in_person"
              ? "onsite"
              : "online",
          ...(isPrimerosAuxilios
            ? {
                startDate: "2027-01-15",
                duration: "P12W",
              }
            : {}),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd).replace(/</g, "\\u003c") }}
      />
      <CourseDetailView course={course} />
    </>
  );
}
