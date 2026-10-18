"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Award, Building2, Stethoscope } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";
import { Carousel } from "@/components/ui/carousel/Carousel";
import { TEAM_MEMBERS, type TeamMember } from "../data/team";

interface TeamSectionProps {
  isCarousel?: boolean;
}

export function TeamSection({ isCarousel = false }: TeamSectionProps) {
  return (
    <section id="equipo" className="py-16 sm:py-20 bg-paper">
      <div className="wrap">
        <FadeIn className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <Eyebrow>Equipo Humano &amp; Académico</Eyebrow>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
              Equipo Directivo y Plana Docente
            </h2>
            <p className="mt-2.5 text-sm sm:text-base max-w-xl text-ink-soft leading-relaxed">
              Docentes especialistas con amplia experiencia profesional y docente en hospitales de referencia nacional e internacional.
            </p>
          </div>
          <div className="text-xs font-semibold text-navy/80 border border-line px-4 py-2 rounded-full bg-bg-alt shrink-0">
            FORMASALUD · Plana Oficial
          </div>
        </FadeIn>

        {/* Renderizado condicional: Carrusel Embla para Home o Grid para Quiénes Somos */}
        {isCarousel ? (
          <FadeIn delay={0.1}>
            <Carousel
              slideClassName="flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              className="px-1"
            >
              {TEAM_MEMBERS.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </Carousel>
          </FadeIn>
        ) : (
          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {TEAM_MEMBERS.map((member) => (
              <StaggerItem key={member.id} className="h-full">
                <TeamCard member={member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative flex h-full w-full flex-col justify-between rounded-2xl border border-line bg-white p-6 sm:p-7 shadow-[0_8px_28px_rgba(15,41,66,0.06)] transition-all duration-300 hover:border-teal/40 hover:shadow-[0_18px_40px_rgba(15,41,66,0.13)] hover:-translate-y-1 overflow-hidden">
      {/* Borde superior institucional */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-navy via-teal to-gold" />

      <div>
        {/* Cabecera: Avatar de iniciales + Etiqueta de especialidad */}
        <div className="flex items-center justify-between gap-3 mb-5 pt-1">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy via-navyink to-tealdeep text-lg font-extrabold text-goldpale border-2 border-gold/60 shadow-md shrink-0 group-hover:scale-105 transition-transform">
            <span>{member.initials}</span>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-navyink shadow-xs">
              <Stethoscope className="h-3 w-3" />
            </span>
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-wider text-tealdeep bg-tealtint px-3 py-1 rounded-full border border-teal/20 text-right">
            {member.specialtyTag}
          </span>
        </div>

        {/* Rol y Nombre del Docente */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
          {member.role}
        </span>
        <h3 className="mt-1 text-base sm:text-lg font-extrabold leading-snug text-navy group-hover:text-tealdeep transition-colors">
          {member.name}
        </h3>

        {/* Credenciales */}
        <div className="mt-3 flex items-start gap-2 text-xs sm:text-[13px] font-semibold leading-snug text-tealdeep bg-bg-alt/80 p-3 rounded-xl border border-line">
          <Award className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span>{member.credentials}</span>
        </div>

        {/* Biografía */}
        {member.bio && (
          <p className="mt-3.5 text-xs leading-relaxed text-ink-soft">
            {member.bio}
          </p>
        )}
      </div>

      {/* Pie de tarjeta: Institución hospitalaria y enlace */}
      <div className="mt-5 pt-4 border-t border-line flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-navy/80 min-w-0">
          <Building2 className="h-3.5 w-3.5 text-teal shrink-0" />
          <span className="truncate" title={member.institution}>
            {member.institution}
          </span>
        </div>

        <Link
          href="/quienes-somos"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-teal hover:text-navy transition-colors"
        >
          <span>Perfil</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}