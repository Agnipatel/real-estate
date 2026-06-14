"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      q: "What does a real estate marketing agency do?",
      a: "A real estate marketing agency helps builders, developers, and property brands generate leads, increase project visibility, and improve sales through digital marketing strategies like Meta Ads, Google Ads, SEO, and CRM automation."
    },
    {
      q: "How does PANDAeCe generate real estate leads?",
      a: "PANDAeCe uses AI-powered performance marketing strategies, targeted advertising, landing page optimization, and automation tools to generate qualified property inquiries and buyer leads."
    },
    {
      q: "Why is digital marketing important for real estate businesses?",
      a: "Most property buyers search online before making a purchase decision. Digital marketing helps real estate brands increase visibility, build trust, and generate high-intent buyer inquiries."
    },
    {
      q: "Which platforms are best for real estate advertising?",
      a: "Meta Ads, Google Ads, SEO, WhatsApp marketing, and landing page campaigns are highly effective for real estate lead generation."
    },
    {
      q: "Can PANDAeCe help with luxury and commercial property marketing?",
      a: "Yes. PANDAeCe provides customized marketing solutions for residential, luxury, and commercial real estate projects."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Frequently Asked <span className="text-green-500">Questions</span></h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-white text-sm sm:text-base md:text-lg pr-4">{faq.q}</span>
                <ChevronDown 
                  className={`text-green-500 transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? "rotate-180" : ""}`} 
                  size={20} 
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-slate-800/50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
       {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <a
            href="#contact"
            className="w-full max-w-2xl bg-green-600 hover:bg-green-700 text-white text-center text-base sm:text-xl md:text-2xl lg:text-3xl font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/30 flex items-center justify-center group"
          >
            <span className="break-words">Get Your Free Marketing Strategy Consultation</span>
            <ArrowRight
              className="ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform flex-shrink-0"
              size={20}
            />
          </a>
        </div>
    </section>
  );
}
const ArrowRight = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);