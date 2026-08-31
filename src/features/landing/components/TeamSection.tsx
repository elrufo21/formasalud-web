import React from "react";
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
              className="rounded-2xl bg-white border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Photo / Avatar Placeholder */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy via-navyink to-teal text-goldpale border border-gold flex items-center justify-center font-serif italic text-xl font-bold flex-none shadow-md">
                  {member.initials}
                </div>
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-teal bg-tealtint px-2.5 py-1 rounded-full font-semibold">
                  {member.specialtyTag}
                </span>
              </div>

              <div className="mt-5 space-y-1">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-gold block font-semibold">
                  {member.role}
                </span>
                <h3 className="text-lg font-serif font-bold text-navy">
                  {member.name}
                </h3>
                <span className="font-mono text-xs text-ink-soft block font-medium">
                  {member.credentials}
                </span>
                <span className="text-xs text-teal block font-semibold pt-0.5">
                  {member.institution}
                </span>
              </div>

              <p className="mt-4 pt-4 border-t border-line text-xs sm:text-[13px] text-ink-soft leading-relaxed flex-1">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
