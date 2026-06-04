"use client";

import { motion } from "framer-motion";
import { Share2, Search, LayoutDashboard, MessageSquare, LineChart, Cpu } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <UsersIcon />,
      title: "Online Lead Generation",
      desc: "High-performing campaigns generating verified buyer leads for residential, commercial, and luxury projects."
    },
    {
      icon: <Share2 className="text-green-500" size={32} />,
      title: "Meta Ads for Real Estate",
      desc: "Targeted Facebook and Instagram campaigns designed to reach potential homebuyers and investors."
    },
    {
      icon: <Search className="text-green-500" size={32} />,
      title: "Google Ads for Property",
      desc: "Search and Performance Max campaigns optimized for high-intent property searches."
    },
    {
      icon: <LayoutDashboard className="text-green-500" size={32} />,
      title: "Landing Page Optimization",
      desc: "Conversion-focused landing pages that improve inquiry rates and increase lead quality."
    },
    {
      icon: <MessageSquare className="text-green-500" size={32} />,
      title: "CRM & WhatsApp Automation",
      desc: "Automated lead nurturing systems helping sales teams respond faster and improve follow-ups."
    },
    {
      icon: <LineChart className="text-green-500" size={32} />,
      title: "SEO for Developers",
      desc: "Search engine optimization strategies increasing organic visibility for property searches."
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Real Estate <span className="text-green-500">Marketing Services</span></h2>
          <p className="text-gray-400 text-lg">
            Comprehensive digital marketing solutions engineered to drive property sales and maximize your ROI.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-900 border border-slate-800 hover:border-green-500/50 p-8 rounded-2xl transition-all group"
            >
              <div className="bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Highlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-900/40 to-slate-900 border border-green-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <Cpu size={400} />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center text-green-400 font-bold mb-4 uppercase tracking-wider text-sm">
              <Cpu className="mr-2" size={18} />
              AI-Powered Real Estate Advertising
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Measurable business growth, not just traffic.
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              As an AI performance marketing company, PANDAeCe uses advanced analytics and automation to optimize campaigns in real time.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-white font-medium">
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-3" /> Reach the right audience</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-3" /> Reduce wasted ad spend</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-3" /> Improve targeting accuracy</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-3" /> Generate higher-quality leads</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
