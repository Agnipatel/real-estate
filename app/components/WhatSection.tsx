"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Navbar from "../components/Navbar";

const WHATSAPP_NUMBER = "918217794751";
const WHATSAPP_MSG = encodeURIComponent(
  "Hi PANDAeCe! I'm interested in your services. Please share more details."
);

export default function WhatSection() {
  const contactItems = [
    {
      icon: <Phone size={22} />,
      label: "Call Us",
      value: "+91 82177 94751",
      href: "tel:+918217794751",
      cta: "Call now",
    },
    {
      icon: <FaWhatsapp size={22} />,
      label: "WhatsApp",
      value: "+91 82177 94751",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`,
      cta: "Message us",
      highlight: true,
    },
    {
      icon: <Mail size={22} />,
      label: "Email Us",
      value: "info@pandaece.com",
      href: "mailto:info@pandaece.com",
      cta: "Send email",
    },
    {
      icon: <Clock size={22} />,
      label: "Working Hours",
      value: "Mon – Sat: 9 AM – 7 PM",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/30 via-slate-950 to-slate-950" />
          <div className="absolute top-20 left-8 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-8 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              We respond within 24 hours
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Connect With{" "}
              <span className="text-green-500">Our Team</span>
            </h1>

            <p className="text-xl md:text-3xl text-gray-300 mb-6">
              Get Your{" "}
              <span className="text-green-400">
                Free Consultation
              </span>
            </p>

            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              Talk to our experts and discover growth opportunities for your business.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-3 rounded-full font-semibold flex items-center gap-2 transition"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
              </a>

              <a
                href="tel:+918217794751"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-7 py-3 rounded-full flex items-center gap-2 transition"
              >
                <Phone size={18} />
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-900 border rounded-2xl p-6 ${
                  item.highlight
                    ? "border-green-500/40"
                    : "border-slate-800"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    item.highlight
                      ? "bg-green-500/20 text-green-400"
                      : "bg-slate-800 text-green-400"
                  }`}
                >
                  {item.icon}
                </div>

                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  {item.label}
                </p>

                <p className="font-semibold text-white mb-3">
                  {item.value}
                </p>

                {item.href && (
                  <a
                    href={item.href}
                    className="text-green-400 flex items-center gap-1 text-sm"
                  >
                    {item.cta}
                    <ArrowRight size={14} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}