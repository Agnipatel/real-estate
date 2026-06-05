"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Loader2, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Residential Real Estate",
    budget: "40k - 50k",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError) return;
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
        setFormData({ name: "", email: "", phone: "", propertyType: "Residential Real Estate", budget: "40k - 50k", message: "" });
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to submit. Please try again.");
    }
  };

  const contactCards = [
    {
      icon: <Phone size={24} />,
      label: "Call Us",
      value: "+91 8217794751",
      href: "tel:+918217794751",
      cta: "Call now",
    },
    {
      icon: <Mail size={24} />,
      label: "Email Us",
      value: "info@pandaece.com",
      href: "mailto:info@pandaece.com",
      cta: "Send email",
    },
    {
      icon: <FaWhatsapp size={24} />,
      label: "WhatsApp",
      value: "+91 8217794751",
      href: "https://wa.me/918217794751",
      cta: "Chat now",
    },
    {
      icon: <Clock size={24} />,
      label: "Working Hours",
      value: "Mon – Sat: 9 AM – 7 PM",
      href: null,
      cta: null,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-slate-950 to-slate-950" />
          {/* Decorative blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-medium text-sm mb-6">
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let&apos;s Scale Your{" "}
              <span className="text-green-500">Real Estate Brand</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Book a free consultation with our performance marketing experts.
              We&apos;ll craft a custom strategy tailored to your property
              projects and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-900 border border-slate-800 hover:border-green-500/40 rounded-2xl p-6 transition-all group"
              >
                <div className="bg-green-500/10 text-green-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <p className="text-sm text-gray-400 font-medium mb-1">{card.label}</p>
                <p className="text-white font-semibold mb-3">{card.value}</p>
                {card.href && card.cta && (
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center group/link"
                  >
                    {card.cta}
                    <ArrowRight size={14} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form + Info */}
      <section className="py-16 bg-slate-900/50 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Generate <span className="text-green-500">High-Quality Leads?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Whether you&apos;re launching a new residential project, promoting luxury
                apartments, or scaling commercial property campaigns — PANDAeCe builds
                campaigns that deliver measurable results.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  "Dedicated real estate marketing team",
                  "AI-powered audience targeting",
                  "Full-funnel campaign management",
                  "Real-time analytics and reporting",
                  "Guaranteed lead quality SLA",
                ].map((point, i) => (
                  <div key={i} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-3 flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-start">
                  <div className="bg-slate-700 p-3 rounded-full text-green-400 mr-4 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-1">Office Address</p>
                    <p className="text-white font-semibold leading-relaxed">
                      4th Floor, 292, 7th Main Rd,<br />
                      Vyalikaval HBCS Layout, Nagavara,<br />
                      Bengaluru, Karnataka 560045
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative"
            >
              <div className="absolute -top-4 -right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                Free Consultation
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Book Your Free Audit</h3>
              <p className="text-gray-400 mb-8">
                Fill out the form and our experts will reach out within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "");
                      setFormData({ ...formData, email: value });
                      if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                        setEmailError("Please enter a valid email address.");
                      } else {
                        setEmailError("");
                      }
                    }}
                    onKeyDown={(e) => { if (e.key === " ") e.preventDefault(); }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData("text").replace(/\s/g, "");
                      setFormData({ ...formData, email: pasted });
                      if (pasted && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(pasted)) {
                        setEmailError("Please enter a valid email address.");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className={`w-full bg-slate-900 border ${emailError ? 'border-red-500' : 'border-slate-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors`}
                    placeholder="john@example.com"
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                    >
                      <option>Residential Real Estate</option>
                      <option>Commercial Real Estate</option>
                      <option>Luxury Real Estate</option>
                      <option>Land / Plots</option>
                      <option>Industrial Real Estate</option>
                      <option>Mixed-Use Real Estate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                    >
                      <option value="40k - 50k">₹40k – ₹50k / month</option>
                      <option value="50k - 1cr">₹50k – ₹1 Cr / month</option>
                      <option value="1cr - 2cr">₹1 Cr – ₹2 Cr / month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {status === "success" && (
                  <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm">
                    ✅ Thank you! Our team will reach out to you within 24 hours.
                  </div>
                )}

                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                    {errorMessage || "Failed to submit. Please try again."}
                  </div>
                )}

                <button
                  type="submit"
                  id="contact-page-submit-btn"
                  disabled={status === "loading"}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-bold px-4 py-4 rounded-lg transition-all mt-2 flex justify-center items-center group"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : null}
                  Book Free Consultation
                  {status !== "loading" && (
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
