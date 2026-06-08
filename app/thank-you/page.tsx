"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone, Mail, Home } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const REDIRECT_SECONDS = 15;

export default function ThankYouPage() {
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = "/";
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const steps = [
    {
      number: "01",
      title: "Submission Received",
      description: "We've got your details and our team has been notified.",
      done: true,
    },
    {
      number: "02",
      title: "Strategy Review",
      description: "Our experts analyse your project & budget within a few hours.",
      done: false,
    },
    {
      number: "03",
      title: "24-Hour Callback",
      description: "A dedicated consultant will reach out within 24 hours.",
      done: false,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
      <Navbar />

      {/* Background decorative blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-green-600/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/4 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-6">

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
          className="relative mb-8"
        >
          {/* Ripple rings */}
          <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
          <span className="absolute -inset-3 rounded-full bg-green-500/10 animate-ping [animation-delay:0.4s]" />
          <div className="relative w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
            <CheckCircle className="text-green-400" size={44} strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-center mb-12 max-w-2xl"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-medium text-sm mb-5">
            🎉 Submission Confirmed
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Thank You for{" "}
            <span className="text-green-500">Reaching Out!</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Your enquiry has been received. Our performance marketing team will
            review your project and get back to you{" "}
            <span className="text-white font-semibold">within 24 hours</span> with
            a tailored strategy.
          </p>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-3xl mb-12"
        >
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500 mb-8">
            What Happens Next
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                className={`relative bg-slate-900 border rounded-2xl p-6 transition-all ${
                  step.done
                    ? "border-green-500/50 shadow-[0_0_24px_rgba(34,197,94,0.08)]"
                    : "border-slate-800"
                }`}
              >
                {step.done && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="text-green-500" size={16} />
                  </div>
                )}
                <p className="text-3xl font-bold text-green-500/30 mb-3 font-mono">
                  {step.number}
                </p>
                <h3 className={`font-semibold mb-2 ${step.done ? "text-white" : "text-gray-300"}`}>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="w-full max-w-3xl mb-10"
        >
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              Need to speak to someone immediately?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="tel:+918217794751"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <Phone size={15} className="text-green-400" />
                Call Us
              </a>
              <a
                href="https://wa.me/918217794751"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <FaWhatsapp size={15} />
                WhatsApp
              </a>
              <a
                href="mailto:info@pandaece.com"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <Mail size={15} className="text-green-400" />
                Email
              </a>
            </div>
          </div>
        </motion.div>

        {/* CTA + Auto-redirect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-full transition-all transform hover:scale-105 group"
          >
            <Home size={18} />
            Back to Home
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-600 text-sm">
            Redirecting to home in{" "}
            <span className="text-green-500 font-semibold tabular-nums">{countdown}s</span>
          </p>
        </motion.div>

      </section>

      <Footer />
    </main>
  );
}
