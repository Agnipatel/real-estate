"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { FaMeta, FaGoogle, FaShopify, FaAmazon, FaWhatsapp } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "Residential Real Estate",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", propertyType: "Residential Real Estate" });
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.png"
          alt="Modern Bangalore Real Estate"
          className="w-full hover:text-green-500 h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/70" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-medium text-sm mb-6">
              Real Estate Marketing Agency in Bangalore
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              AI-Powered Online Lead Generation for <span className="text-green-500">Real Estate Brands</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              PANDAeCe is a performance-driven real estate marketing agency helping builders, developers, and property brands generate high-quality buyer leads through AI-powered digital marketing strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#contact" className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 group">
                Book Free Marketing Audit
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium text-gray-400">
              <span className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} /> More Visibility</span>
              <span className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} /> Qualified Leads</span>
              <span className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} /> Property Sales</span>
            </div>
          </motion.div>

          {/* Lead Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl relative"
          >
            <div className="absolute -top-4 -right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              Free Consultation
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Connect With Our Team</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
                  placeholder="+91 00000 00000" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">What service are you looking for?</label>
                <select 
                  value={formData.propertyType}
                  onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                >
                  <option>Residential Real Estate</option>
                  <option>Commercial Real Estate</option>
                  <option>Industrial Real Estate</option>
                  <option>Land / Plots</option>
                  <option>Luxury Real Estate</option>
                  <option>Mixed-Use Real Estate</option>
                </select>
              </div>

              {status === "success" && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm">
                  Thank you! We will connect with you soon.
                </div>
              )}
              
              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                  {errorMessage || "Failed to submit. Please try again."}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full bg-white text-slate-900 font-bold px-4 py-4 rounded-lg hover:bg-gray-100 transition-colors mt-2 flex justify-center items-center"
              >
                {status === "loading" ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                Request Free Audit
              </button>
            </form>
          </motion.div>
        </div>

        {/* Partners */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 border-t border-slate-800 pt-8"
        >
          <p className="text-center text-sm font-medium text-gray-400 mb-6 uppercase tracking-wider">Trusted By Modern Businesses & Official Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500">
            {[
              { name: "Meta Business", icon: <FaMeta size={28} color="#0668E1" /> },
              { name: "Google Ads", icon: <FaGoogle size={28} color="#4285F4" /> },
              { name: "Shopify", icon: <FaShopify size={28} color="#95BF47" /> },
              { name: "Amazon", icon: <FaAmazon size={28} color="#FF9900" /> },
              { name: "WhatsApp", icon: <FaWhatsapp size={28} color="#25D366" /> },
              { name: "Analytics", icon: <SiGoogleanalytics size={28} color="#F4B400" /> }
            ].map((partner) => (
              <div key={partner.name} className="flex items-center space-x-3 text-xl font-bold text-white opacity-80 hover:opacity-100 transition-all hover:scale-105 transform duration-300">
                {partner.icon}
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
