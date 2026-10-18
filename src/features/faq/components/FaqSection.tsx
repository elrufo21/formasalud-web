"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";
import { FAQ_DATA } from "../data/faq";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("modalidad");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-20 bg-paper">
      <div className="wrap max-w-[920px]">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <Eyebrow className="justify-center">Resolución de Dudas</Eyebrow>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-ink-soft leading-relaxed">
            Todo lo que necesitas saber sobre nuestra modalidad de estudio, acceso al Aula Virtual y proceso de certificación.
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.08} className="space-y-3">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <StaggerItem key={item.id}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-bg-alt/70 border-teal/40 shadow-[0_8px_24px_rgba(15,41,66,0.06)]"
                      : "bg-white border-line hover:border-line-strong"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full text-left flex justify-between items-center gap-4 p-5 sm:p-6 text-sm sm:text-base font-bold text-navy cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? "bg-teal text-white"
                            : "bg-tealtint text-tealdeep"
                        }`}
                      >
                        {item.num}
                      </span>
                      <span className="leading-snug">{item.question}</span>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-teal/15 text-teal rotate-180"
                          : "bg-bg-alt text-ink-soft"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-5 sm:pl-[4.25rem]">
                          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

