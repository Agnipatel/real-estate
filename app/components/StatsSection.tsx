"use client";

import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Zap, Server, BarChart } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { value: "400+", label: "Happy Clients", desc: "Helping brands scale with AI-powered strategies." },
    { value: "4K+", label: "Lead Campaigns", desc: "Successfully managed across multiple industries." },
    { value: "100K+", label: "Social Queries", desc: "Generated customer engagement with measurable results." }
  ];

  const reasons = [
   
    { icon: <Zap className="text-green-500" size={24} />, title: "AI-Powered Optimization", desc: "Advanced automation improves targeting." },
    { icon: <TrendingUp className="text-green-500" size={24} />, title: "Conversion-Focused", desc: "Focus on qualified leads and revenue." },
    { icon: <Server className="text-green-500" size={24} />, title: "End-to-End Support", desc: "From ad creatives to CRM automation." },
    { icon: <CheckCircle className="text-green-500" size={24} />, title: "Transparent Reporting", desc: "Track performance, quality, and ROI." }
  ];

  return (
    <section className="py-24 bg-slate-900 relative border-t border-slate-800 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Performance <span className="text-green-500">Numbers</span></h2>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-2xl text-center backdrop-blur-sm"
            >
              <div className="text-5xl font-extrabold text-white mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">{stat.value}</div>
              <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
              <p className="text-gray-400 text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Partner */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/images/ai_marketing.png" 
              alt="AI Marketing" 
              className="rounded-2xl shadow-2xl border border-slate-700/50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Why Partner With Our <span className="text-green-500">Agency?</span></h2>
            
            <div className="space-y-6">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex">
                  <div className="flex-shrink-0 mt-1 bg-slate-800 p-2 rounded-lg border border-slate-700 h-fit">
                    {reason.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-white mb-1">{reason.title}</h4>
                    <p className="text-gray-400">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a href="#contact" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get a Free Real Estate Marketing Audit
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
