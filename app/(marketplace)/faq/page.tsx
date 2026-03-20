"use client";

import { useState } from "react";
import { FAQ, FaqSection } from "@/lib/data/faq";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className="w-full text-left border border-[#1A1A1A]/[0.07] rounded-xl bg-white px-5 py-4 hover:border-[#2D5BE3]/20 transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-[#1A1A1A]">{question}</p>
        <ChevronDown
          className={`w-4 h-4 text-[#1A1A1A]/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && (
        <p className="text-sm text-[#1A1A1A]/50 leading-relaxed mt-3 border-t border-[#1A1A1A]/[0.05] pt-3">
          {answer}
        </p>
      )}
    </button>
  );
}

function FaqSectionBlock({ title, items }: FaqSection) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-4">
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <FaqItem key={item.question} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] mb-2">
          Frequently asked questions
        </h1>
        <p className="text-[#1A1A1A]/40 text-sm leading-relaxed">
          Can&apos;t find what you&apos;re looking for? Reach us at{" "}
          <Link
            href="mailto:hello@ownie.com"
            className="text-[#2D5BE3] hover:underline"
          >
            hello@ownie.com
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {FAQ.map((section) => (
          <FaqSectionBlock key={section.title} {...section} />
        ))}
      </div>
    </div>
  );
}
