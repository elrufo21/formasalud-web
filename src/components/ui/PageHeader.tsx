import React from "react";

interface PageHeaderProps {
  sectionTag: string;
  title: string;
  lede: string;
}

export function PageHeader({ sectionTag, title, lede }: PageHeaderProps) {
  return (
    <div className="py-14 border-b border-line texture-light">
      <div className="wrap">
        <div className="font-mono text-xs text-teal tracking-widest uppercase mb-4 flex items-center gap-3.5">
          <span>FORMASALUD</span>
          <span className="text-line-strong">/</span>
          <span>{sectionTag}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif text-navy font-semibold leading-tight max-w-[760px]">
          {title}
        </h1>
        <p className="text-base text-ink-soft mt-3.5 max-w-[600px] leading-relaxed">
          {lede}
        </p>
      </div>
    </div>
  );
}
