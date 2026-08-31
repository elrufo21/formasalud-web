"use client";

import React, { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQ_DATA } from "../data/faq";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("modalidad");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20">
      <div className="wrap max-w-[900px]">
        <Eyebrow>Resolución de Dudas</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-serif text-navy mt-4">
          Preguntas Frecuentes
        </h2>

        <div className="faq-list border-t border-line mt-8">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="faq-item border-b border-line">
                <button
                  onClick={() => toggle(item.id)}
                  className="faq-q w-full text-left flex justify-between items-center gap-5 py-6 font-serif text-lg font-medium text-navy cursor-pointer"
                >
                  <div className="flex items-center">
                    <span className="n font-mono text-xs text-line-strong mr-3.5">
                      {item.num}
                    </span>
                    <span>{item.question}</span>
                  </div>
                  <div
                    className={`plus relative w-5 h-5 flex-none transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <span className="absolute w-3.5 h-[1.6px] bg-teal top-[9px] left-[3px]" />
                    <span className="absolute w-[1.6px] h-3.5 bg-teal left-[9px] top-[3px]" />
                  </div>
                </button>
                {isOpen && (
                  <div className="faq-a pb-6 pl-9 pr-4">
                    <p className="text-sm md:text-base text-ink-soft leading-relaxed max-w-2xl">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
