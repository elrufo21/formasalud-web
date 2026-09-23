import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TEAM_MEMBERS } from "../data/team";

// Foto de cada docente: se busca por su nombre (sin tildes y en minúsculas).
// Si en data/team.ts el docente ya tiene photoUrl, esa tiene prioridad.
const TEAM_PHOTOS: { match: string; src: string }[] = [
  { match: "miguel eduardo", src: "/images/teamcart/teamcart-migueledu.png" },
  { match: "miguel zambrano", src: "/images/teamcart/teamcart-miguelzam.png" },
  { match: "roberto", src: "/images/teamcart/teamcart.roberto.png" },
  { match: "bertha", src: "/images/teamcart/teamcart-bertha.png" },
  { match: "francisco", src: "/images/teamcart/teamcart-francisco.png" },
  { match: "percy", src: "/images/teamcart/teamcart-percy.png" },
];

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function findPhoto(name: string): string | null {
  const n = normalize(name);
  return TEAM_PHOTOS.find((p) => n.includes(p.match))?.src ?? null;
}

const MEMBERS = TEAM_MEMBERS.map((m: any) => ({
  ...m,
  photoUrl: m.photoUrl ?? findPhoto(m.name),
}));

interface TeamSectionProps {
  isCarousel?: boolean;
}

export function TeamSection({ isCarousel = false }: TeamSectionProps) {
  return (
    <section id="equipo" className="py-20 bg-paper">
      <div className="wrap">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <Eyebrow>Equipo Humano & Académico</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-serif text-navy mt-3">
              Equipo Directivo y Plana Docente
            </h2>
            <p className="mt-2.5 text-sm sm:text-base max-w-xl text-ink-soft leading-relaxed">
              Profesionales con amplia trayectoria asistencial y de gestión comprometidos con la excelencia académica en salud.
            </p>
          </div>
          <div className="font-mono text-xs text-navy/70 border border-line px-3.5 py-2 rounded-full bg-bg-alt">
            Lima, Perú · RUC 20613837613
          </div>
        </div>

        {/* Renderizado condicional: Carrusel para Home o Grid para Quienes Somos */}
        {isCarousel ? (
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-thin">
            {MEMBERS.map((member) => (
              <div key={member.id} className="w-[320px] sm:w-[360px] flex-shrink-0 snap-start">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MEMBERS.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Card con el diseño de referencia: franja oscura + panel crema + foto circular que cruza ambos
function TeamCard({ member }: { member: any }) {
  return (
    <article className="relative mx-auto flex h-full w-full max-w-[350px] rounded-[28px] shadow-md transition-shadow duration-300 hover:shadow-xl">
      {/* Franja oscura izquierda (queda detrás del panel) */}
      <div className="absolute inset-y-0 left-0 w-1/2 rounded-l-[28px] bg-[#12383F]" />

      {/* Foto circular */}
      <div className="absolute left-4 top-4 z-20 h-36 w-36">
        <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-[#C9B48C] bg-[#12383F]">
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={member.name}
              fill
              sizes="144px"
              className="object-cover object-top"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-serif text-3xl font-bold italic text-goldpale">
              {member.initials}
            </span>
          )}
        </div>

        {/* Insignia con iniciales, sobre el borde de la foto */}
        {member.photoUrl && (
          <span className="absolute left-[100px] top-[100px] flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#C9B48C] bg-[#12383F] font-serif text-sm font-semibold text-[#E8DCC0]">
            {member.initials}
          </span>
        )}
      </div>

      {/* Panel crema con borde */}
      <div className="relative z-10 ml-[24%] flex flex-1 flex-col rounded-[28px] border border-[#C9B48C] bg-[#F3EBDA] pb-5 pl-5 pr-4 pt-[10.75rem]">
        <h3 className="font-serif text-lg font-bold leading-tight text-[#0B1F24]">
          {member.name}
        </h3>

        <div className="mt-2.5 flex items-start gap-2 text-[13px] font-medium leading-snug text-[#0B1F24]">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{member.credentials || member.specialtyTag}</span>
        </div>

        {member.bio && (
          <p className="mt-2.5 text-xs leading-snug text-[#1F2E31]">
            {member.bio}
          </p>
        )}

        <div className="mt-auto pt-4">
          <Link
            href={member.profileUrl || "#"}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#12383F] px-5 py-2 text-sm font-medium text-[#F3EBDA] transition-colors hover:bg-[#0D2C31]"
          >
            <span>Ver perfil</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}