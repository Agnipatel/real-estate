"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Navbar from "../components/Navbar";

const WHATSAPP_NUMBER = "918217794751";
const WHATSAPP_MSG = encodeURIComponent(
  "Hi PANDAeCe! I'm interested in your real estate marketing services. Please share more details."
);
const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=4th+Floor,+292,+7th+Main+Rd,+Vyalikaval+HBCS+Layout,+Nagavara,+Bengaluru,+Karnataka+560045";

export default function ContactPage() {
  const router = useRouter();
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
        setFormData({
          name: "",
          email: "",
          phone: "",
          propertyType: "Residential Real Estate",
          budget: "40k - 50k",
          message: "",
        });
        router.push("/thank-you");
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to submit. Please try again.");
    }
  };

  /* ─── Step-by-step process ─── */
  const steps = [
    {
      num: "01",
      icon: <Mail size={20} />,
      title: "Submit Your Details",
      desc: "Fill in the form with your project info and budget. Takes less than 2 minutes.",
    },
    {
      num: "02",
      icon: <Phone size={20} />,
      title: "Expert Review",
      desc: "Our real estate marketing team analyses your project goals and target audience.",
    },
    {
      num: "03",
      icon: <CheckCircle2 size={20} />,
      title: "24-Hour Callback",
      desc: "A dedicated consultant calls you within 24 hours with a custom strategy.",
    },
    {
      num: "04",
      icon: <ArrowRight size={20} />,
      title: "Campaign Launch",
      desc: "We launch your high-performance campaigns and start delivering quality leads.",
    },
  ];

  /* ─── Quick contact items ─── */
  const contactItems = [
    {
      icon: <Phone size={22} />,
      label: "Call Us",
      value: "+91 82177 94751",
      href: "tel:+918217794751",
      cta: "Call now",
      external: false,
    },
    {
      icon: <FaWhatsapp size={22} />,
      label: "WhatsApp",
      value: "+91 82177 94751",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`,
      cta: "Message us",
      external: true,
      highlight: true,
    },
    {
      icon: <Mail size={22} />,
      label: "Email Us",
      value: "info@pandaece.com",
      href: "mailto:info@pandaece.com",
      cta: "Send email",
      external: false,
    },
    {
      icon: <Clock size={22} />,
      label: "Working Hours",
      value: "Mon – Sat: 9 AM – 7 PM",
      href: null,
      cta: null,
      external: false,
    },
  ];

  const inputClass =
    "w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all";

  return (
    <main id="contact" className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/30 via-slate-950 to-slate-950" />
          <div className="absolute top-20 left-8 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-8 w-96 h-96 bg-green-500/6 rounded-full blur-3xl" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-medium text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              We respond within 24 hours
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
              Connect With{" "}
              <span className="text-green-500">Our Team</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-slate-300 mb-6">
              Get Your{" "}
              <span className="text-green-400 border-b-2 border-green-500/50 pb-0.5">
                Free Marketing Audit
              </span>
            </p>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Book a free strategy session with our performance marketing experts.
              We&apos;ll craft a custom growth plan tailored to your property project and budget.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-cta"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-3.5 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-green-900/30"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+918217794751"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium px-7 py-3.5 rounded-full transition-all"
              >
                <Phone size={17} />
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CONTACT CARDS ══════════════════ */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactItems.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative bg-slate-900 border rounded-2xl p-6 transition-all group ${
                  card.highlight
                    ? "border-[#25D366]/40 shadow-[0_0_20px_rgba(37,211,102,0.08)]"
                    : "border-slate-800 hover:border-green-500/40"
                }`}
              >
                {card.highlight && (
                  <div className="absolute -top-2.5 left-4 bg-[#25D366] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    FASTEST REPLY
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    card.highlight
                      ? "bg-[#25D366]/15 text-[#25D366]"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {card.icon}
                </div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">
                  {card.label}
                </p>
                <p className="text-white font-semibold mb-3 text-sm leading-snug">
                  {card.value}
                </p>
                {card.href && card.cta && (
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className={`text-sm font-medium flex items-center gap-1 group/link transition-colors ${
                      card.highlight
                        ? "text-[#25D366] hover:text-[#1ebe5d]"
                        : "text-green-400 hover:text-green-300"
                    }`}
                  >
                    {card.cta}
                    <ArrowRight
                      size={13}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ══════════════════ FORM + INFO ══════════════════ */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* ── Left: info panel ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Generate{" "}
                <span className="text-green-500">High-Quality Leads?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Whether you&apos;re launching a residential project, promoting luxury
                apartments, or scaling commercial campaigns — PANDAeCe builds
                data-driven strategies that deliver measurable results.
              </p>

              {/* Bullet points */}
              <div className="space-y-4 mb-10">
                {[
                  "Dedicated real estate marketing team",
                  "AI-powered audience targeting",
                  "Full-funnel campaign management",
                  "Real-time analytics & reporting",
                  "Guaranteed lead quality SLA",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={17} className="text-green-500 flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>

              {/* Office Address — clickable Google Maps */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="office-address-map-link"
                className="group flex items-start gap-4 bg-slate-900 border border-slate-800 hover:border-green-500/40 rounded-2xl p-5 transition-all"
              >
                <div className="bg-green-500/10 text-green-400 p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">
                      Office Address
                    </p>
                    <ExternalLink
                      size={11}
                      className="text-gray-600 group-hover:text-green-400 transition-colors"
                    />
                  </div>
                  <p className="text-white font-semibold leading-relaxed text-sm">
                    4th Floor, 292, 7th Main Rd,
                    <br />
                    Vyalikaval HBCS Layout, Nagavara,
                    <br />
                    Bengaluru, Karnataka 560045
                  </p>
                  <p className="text-green-400 text-xs font-medium mt-2 group-hover:text-green-300 transition-colors flex items-center gap-1">
                    Open in Google Maps
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </p>
                </div>
              </a>

              {/* WhatsApp quick message */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-quick-msg"
                className="group mt-4 flex items-center gap-4 bg-[#25D366]/8 border border-[#25D366]/25 hover:border-[#25D366]/50 rounded-2xl p-5 transition-all"
              >
                <div className="bg-[#25D366]/15 text-[#25D366] p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FaWhatsapp size={22} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Prefer WhatsApp?
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Tap to open a chat with a pre-filled message — we reply fast!
                  </p>
                  <p className="text-[#25D366] text-xs font-medium mt-2 flex items-center gap-1">
                    Start WhatsApp chat
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </p>
                </div>
              </a>
            </motion.div>

            {/* ── Right: form ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              {/* Badge */}
              <div className="absolute -top-4 -right-4 bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full animate-pulse shadow-lg">
                Free Consultation
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                Book Your Free Audit
              </h3>
              <p className="text-gray-400 text-sm mb-7">
                Fill out the form — our experts will reach out within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClass}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClass}
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "");
                      setFormData({ ...formData, email: value });
                      if (
                        value &&
                        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                      ) {
                        setEmailError("Please enter a valid email address.");
                      } else {
                        setEmailError("");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " ") e.preventDefault();
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData
                        .getData("text")
                        .replace(/\s/g, "");
                      setFormData({ ...formData, email: pasted });
                      if (
                        pasted &&
                        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          pasted
                        )
                      ) {
                        setEmailError("Please enter a valid email address.");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className={`${inputClass} ${emailError ? "!border-red-500" : ""}`}
                    placeholder="john@example.com"
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                {/* Property Type + Budget */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData({ ...formData, propertyType: e.target.value })
                      }
                      className={`${inputClass} appearance-none`}
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="40k - 50k">₹40k – ₹50k / month</option>
                      <option value="50k - 1cr">₹50k – ₹1 Cr / month</option>
                      <option value="1cr - 2cr">₹1 Cr – ₹2 Cr / month</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message{" "}
                    <span className="text-gray-600 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm">
                    {errorMessage || "Failed to submit. Please try again."}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  id="contact-page-submit-btn"
                  disabled={status === "loading"}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-bold px-4 py-4 rounded-xl transition-all flex justify-center items-center gap-2 group shadow-lg shadow-green-900/20"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : null}
                  Get My Free Marketing Audit
                  {status !== "loading" && (
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </button>

                {/* Trust note */}
                <p className="text-center text-gray-600 text-xs pt-1">
                  🔒 Your information is 100% confidential. No spam, ever.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

     
    </main>
  );
}
