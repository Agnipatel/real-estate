"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "PANDAeCe helped us generate high-quality real estate leads at a lower CPL. Their performance marketing strategy improved our project visibility significantly.",
      author: "Real Estate Developer",
      location: "Bangalore"
    },
    {
      text: "The team understands real estate marketing deeply. From Meta Ads to CRM automation, everything was optimized for conversions.",
      author: "Property Consultant",
      location: ""
    },
    {
      text: "We saw better lead quality and faster inquiry responses after working with PANDAeCe. Their AI-powered approach truly works.",
      author: "Luxury Property Brand",
      location: ""
    },
    {
      text: "From Google Ads to CRM automation, PANDAeCe handled everything professionally. Their data-driven approach helped us improve conversions and sales inquiries.",
      author: "Commercial Real Estate Company",
      location: ""
    },
    {
      text: "PANDAeCe is more than a marketing agency. They focus on real business results, lead quality, and scalable growth strategies.",
      author: "Builder & Developer",
      location: ""
    },
    {
      text: "Their performance marketing campaigns generated strong engagement and qualified leads for our projects. The reporting and optimization process was transparent and effective.",
      author: "Residential Property Brand",
      location: ""
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">What Our <span className="text-green-500">Clients Say</span></h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Don t just take our word for it. Here is what leading real estate brands have to say about our performance marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm sm:text-base text-gray-300 italic mb-6 leading-relaxed">
                  {item.text}
                </p>
              </div>
              <div className="border-t border-slate-700 pt-4 mt-4">
                <p className="text-white font-bold">{item.author}</p>
                {item.location && <p className="text-sm text-gray-400">{item.location}</p>}
              </div>
            </motion.div>
          ))}
        </div>
 {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <a
            href="#contact"
            className="w-full max-w-2xl bg-green-600 hover:bg-green-700 text-white text-center text-base sm:text-xl md:text-2xl lg:text-3xl font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/30 flex items-center justify-center group"
          >
            <span className="break-words">Let s Grow Your Real Estate Business</span>
            <ArrowRight
              className="ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform flex-shrink-0"
              size={20}
            />
          </a>
        </div>
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