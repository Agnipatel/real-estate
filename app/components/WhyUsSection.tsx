"use client";

import { motion } from "framer-motion";
import { Target, Users, TrendingUp, } from "lucide-react";

export default function WhyUsSection() {
  const focuses = [
    { icon: <Users size={24} />, title: "Qualified property leads" },
    { icon: <Target size={24} />, title: "High-intent buyer inquiries" },
    { icon: <TrendingUp size={24} />, title: "Site visit bookings" },
   
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Smarter Real Estate Marketing <span className="text-green-500">Starts Here</span></h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The modern real estate buyer begins their journey online. Searching properties, comparing projects, exploring locations, and booking site visits now happen digitally. Traditional marketing alone can no longer generate consistent property inquiries.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              PANDAeCe helps real estate businesses adapt to this digital-first market with data-driven performance marketing strategies designed for measurable growth. As a trusted real estate digital marketing agency in Bangalore, we combine creativity, automation, analytics, and advertising to build scalable lead generation systems.
            </p>
            <a href="#contact" className="text-green-400 hover:text-green-300 font-semibold flex items-center group">
              Get Expert Insights for Free 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Results-Focused Lead Generation</h3>
            <p className="text-gray-400 mb-8">We don’t focus only on impressions and clicks. As a leading real estate advertising company, we focus on:</p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {focuses.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-500/10 text-green-500 p-3 rounded-lg mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 font-medium">Better Conversion Rates</p>
                <p className="text-white font-bold text-xl">Higher ROAS</p>
              </div>
              <div className="bg-green-600 px-4 py-2 rounded-lg text-sm font-bold text-white">
                Proven AI Strategy
              </div>
            </div>
          </motion.div>

        </div>
        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <a
            href="#contact"
            className="w-full max-w-2xl bg-green-600 hover:bg-green-700 text-white text-center text-xl md:text-3xl font-bold py-6 md:py-8 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/30 flex items-center justify-center group"
          >
            Request Your Free Lead Generation Audit

            <ArrowRight
              className="ml-3 group-hover:translate-x-1 transition-transform"
              size={28}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

const ArrowRight = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
