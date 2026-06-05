"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Residential Real Estate",
    budget: "40k - 50k",
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
        setFormData({ name: "", email: "", phone: "", propertyType: "Residential Real Estate", budget: "40k - 50k" });
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
    <section id="contact" className="py-24 bg-slate-900 border-t border-slate-800 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Scale Your <span className="text-green-500">Real Estate Brand?</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Whether you are launching a new residential project, promoting luxury apartments, or scaling commercial property campaigns, PANDAeCe helps you generate quality leads that convert into sales.
            </p>
            <p className="text-white font-bold text-xl mb-10">Let’s Build Your Next High-Converting Campaign.</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-full text-green-500 mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Email</p>
                  <a href="mailto:info@pandaece.com" className="text-white font-semibold hover:text-green-400">info@pandaece.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-full text-green-500 mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Phone Number</p>
                  <a href="tel:+918217794751" className="text-white font-semibold hover:text-green-400">+91 8217794751</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-full text-green-500 mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Office Address</p>
                  <p className="text-white font-semibold">4th Floor, 292, 7th Main Rd,<br/>Vyalikaval HBCS Layout, Nagavara,<br/>Bengaluru, Karnataka 560045</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Marketing Audit</h3>
            <p className="text-gray-400 mb-8">Fill out the form below and our experts will get in touch with you shortly.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors" 
                  placeholder="Enter your name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors" 
                  placeholder="Enter your email address" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors" 
                  placeholder="+91" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                <select 
                  value={formData.propertyType}
                  onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                >
                  <option>Residential Real Estate</option>
                  <option>Commercial Real Estate</option>
                  <option>Luxury Real Estate</option>
                  <option>Land / Plots</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                <select 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                >
                  <option value="40k - 50k">₹40k – ₹50k / month</option>
                  <option value="50k - 1cr">₹50k – ₹1 Cr / month</option>
                  <option value="1cr - 2cr">₹1 Cr – ₹2 Cr / month</option>
                </select>
              </div>
              
              {status === "success" && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm">
                  Thank you! Your details have been submitted successfully.
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
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-bold px-4 py-4 rounded-lg transition-colors mt-4 flex justify-center items-center"
              >
                {status === "loading" ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                Book Free Consultation
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
