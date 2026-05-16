import React, { useState } from 'react';

export type FAQItem = { q: string; a: string };

type FAQAccordionProps = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = index === openIndex;

          return (
            <div key={item.q} className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-5"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-extrabold text-black md:text-[15px]">{item.q}</span>
                <span className="text-lg font-medium leading-none text-black">{isOpen ? '−' : '⌄'}</span>
              </button>

              {isOpen ? (
                <div className="px-4 pb-4 pt-0 md:px-5">
                  <p className="text-sm leading-relaxed text-[#334155] md:text-[15px]">{item.a}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}