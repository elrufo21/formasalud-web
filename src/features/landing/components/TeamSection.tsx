import React from "react";
import Image from "next/image";
import { Building2, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TEAM_MEMBERS } from "../data/team";

export function TeamSection() {
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.id}
              className="rounded-2xl bg-white border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Foto del profesor (member.photoUrl) — mientras no haya foto real cargada, se muestra un placeholder con sus iniciales en el mismo espacio */}
              <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-navy via-navyink to-teal flex-none overflow-hidden">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-goldpale">
                    <span className="font-serif italic text-3xl font-bold">
                      {member.initials}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <span className="w-fit font-mono text-[9.5px] uppercase tracking-wider text-teal bg-tealtint px-2.5 py-1 rounded-full font-semibold">
                  {member.role}
                </span>

                <div className="mt-4 space-y-1">
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-gold block font-semibold">
                    {member.specialtyTag}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-navy">
                    {member.name}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft block font-medium">
                    {member.credentials}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-xs text-teal font-semibold">
                  <Building2 className="w-3.5 h-3.5 flex-none" strokeWidth={2} />
                  <span>{member.institution}</span>
                </div>

                <p className="mt-4 pt-4 border-t border-line text-xs sm:text-[13px] text-ink-soft leading-relaxed flex-1">
                  {member.bio}
                </p>

                <div className="mt-4 pt-4 border-t border-line flex justify-end">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal">
                    Ver perfil <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
