
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactModal() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Residential Real Estate",
    budget: "40k-50k",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  /* ================= OPEN MODAL VIA #contact ================= */
  useEffect(() => {
    const openModal = () => {
      setIsOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    };

    if (window.location.hash === "#contact") {
      openModal();
    }

    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      const href = link?.getAttribute("href");

      if (href?.includes("#contact")) {
        e.preventDefault();
        openModal();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "Residential Real Estate",
        budget: "40k-50k",
        message: "",
      });

      // Close popup
      setIsOpen(false);

      // Redirect after popup closes
      setTimeout(() => {
        router.push("/thank-you");
      }, 300);
    } catch (error) {
      console.error(error);

      setStatus("error");

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };
  

  const inputClass =
    "w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 sm:p-8 md:p-10">
            <div className="absolute -top-4 left-4 sm:left-6 bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              Free Consultation
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Real Estate Marketing – PANDAeCe
            </h3>

            <p className="text-sm sm:text-base text-gray-400 mb-6">
              Fill the form and our experts will contact you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                required
                type="text"
                placeholder="Full Name"
                className={inputClass}
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <input
                required
                type="tel"
                placeholder="Phone Number"
                className={inputClass}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />

               <div>
                   
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
                      className={`${inputClass} ${emailError ? "border-red-500" : ""}`}
                      placeholder="john@example.com"
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1">{emailError}</p>
                    )}
                  </div>

              {/* Property Type */}
              <Select
                value={formData.propertyType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    propertyType: value,
                  })
                }
              >
               <SelectTrigger
  className="
    h-12
    w-full
    rounded-xl
    border border-slate-800
    bg-slate-900
    text-white
    px-4
  "
>
  <SelectValue placeholder="Select Property Type" />
</SelectTrigger>
                 

                <SelectContent className="bg-slate-900 border-slate-800 text-white z-[99999]" position="popper" sideOffset={5}>
                  <SelectItem value="Residential Real Estate">
                    Residential Real Estate
                  </SelectItem>

                  <SelectItem value="Commercial Real Estate">
                    Commercial Real Estate
                  </SelectItem>

                  <SelectItem value="Industrial Real Estate">
                    Industrial Real Estate
                  </SelectItem>

                  <SelectItem value="Land / Plots">
                    Land / Plots
                  </SelectItem>

                  <SelectItem value="Luxury Real Estate">
                    Luxury Real Estate
                  </SelectItem>

                  <SelectItem value="Mixed-Use Real Estate">
                    Mixed-Use Real Estate
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Budget */}
              <Select
                value={formData.budget}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    budget: value,
                  })
                }
              >
                <SelectTrigger
  className="
    h-12
    w-full
    rounded-xl
    border border-slate-800
    bg-slate-900
    text-white
    px-4
  "
>
  <SelectValue placeholder="Select Property Type" />
</SelectTrigger>

                <SelectContent className="bg-slate-900 border-slate-800 text-white z-[99999]" position="popper" sideOffset={5}>
                  <SelectItem value="40k-50k">
                    ₹40k – ₹50k / month
                  </SelectItem>

                  <SelectItem value="50k-1cr">
                    ₹50k – ₹1 Cr / month
                  </SelectItem>

                  <SelectItem value="1cr-2cr">
                    ₹1 Cr – ₹2 Cr / month
                  </SelectItem>
                </SelectContent>
              </Select>

              <textarea
                rows={4}
                placeholder="Tell us about your project"
                className={`${inputClass} resize-none`}
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
              />

              {status === "error" && (
                <div className="text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Get My Free Marketing Audit
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                🔒 Your information is 100% confidential.
              </p>
            </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
