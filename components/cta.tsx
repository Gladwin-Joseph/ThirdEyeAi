"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Check } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ContactForm() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && containerRef.current && !hasAnimated.current) {
          hasAnimated.current = true;
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "back.out(1.2)",
              delay: 0.3
            }
          );
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (showSuccess) {
      gsap.fromTo(
        dialogRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [showSuccess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const planeIcon = formRef.current?.querySelector(".send-icon");
    if (planeIcon) {
      const clone = planeIcon.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.zIndex = "50";
      clone.style.pointerEvents = "none";

      const buttonRect = planeIcon.getBoundingClientRect();
      clone.style.left = `${buttonRect.left}px`;
      clone.style.top = `${buttonRect.top}px`;
      document.body.appendChild(clone);

      emailjs
        .sendForm(
          "service_c7qizao",
          "template_pdw04st",
          formRef.current!,
          "kpoE-W5CeZZRJzq1R"
        )
        .then(() => {
          gsap.to(clone, {
            x: window.innerWidth * 0.8,
            y: -window.innerHeight * 0.5,
            rotation: 45,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
              document.body.removeChild(clone);
              setIsSubmitting(false);
              setShowSuccess(true);
              setFormData({ from_name: "", reply_to: "", subject: "", message: "" });
            }
          });
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          setIsSubmitting(false);
          alert("Something went wrong. Please try again.");
          document.body.removeChild(clone);
        });
    }
  };

  const closeDialog = () => {
    gsap.to(dialogRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setShowSuccess(false)
    });
  };

  return (
    <section className="border-t relative overflow-hidden" id="contact">
      <div
        ref={containerRef}
        className="w-full max-w-sm sm:max-w-md mx-auto mt-10 sm:mt-20 relative"
        style={{ opacity: 0 }}
      >
        <div className="flex justify-center mb-4">
          <MessageCircle size={24} className="text-blue-600" />
        </div>

        <h2 className={`text-2xl sm:text-4xl mb-6 sm:mb-8 text-center font-normal ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Contact
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {["from_name", "reply_to", "subject"].map((field, i) => (
            <div className="space-y-1 sm:space-y-2" key={i}>
              <Label htmlFor={field} className={`text-sm font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                {field === "from_name" ? "Name" : field === "reply_to" ? "Email" : "Subject"}
              </Label>
              <Input
                id={field}
                name={field}
                type={field === "reply_to" ? "email" : "text"}
                value={(formData as any)[field]}
                onChange={handleChange}
                placeholder={
                  field === "from_name" ? "Your name" :
                  field === "reply_to" ? "Your email" :
                  "Subject"
                }
                required
                className={`text-sm px-3 py-2 sm:text-base sm:px-4 sm:py-2.5 ${
                  theme === 'dark'
                    ? 'bg-gray-900/50 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  theme === 'dark' ? 'focus:ring-offset-black' : 'focus:ring-offset-white'
                }`}
              />
            </div>
          ))}

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="message" className={`text-sm font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              required
              className={`min-h-[100px] sm:min-h-[120px] text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2.5 ${
                theme === 'dark'
                  ? 'bg-gray-900/50 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                theme === 'dark' ? 'focus:ring-offset-black' : 'focus:ring-offset-white'
              }`}
            />
          </div>

          <Button
            type="submit"
            className={`w-full text-sm sm:text-base py-2 sm:py-2.5 px-4 sm:px-6 transition-all duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              theme === 'dark'
                ? 'bg-blue-800 hover:bg-blue-700 text-white hover:shadow-[0_0_10px_#3b82f6] hover:border-blue-400'
                : 'bg-blue-700 hover:bg-blue-600 text-white hover:shadow-[0_0_10px_#93c5fd] hover:border-blue-500'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={16} className="send-icon sm:size-[18px]" />
                Send
              </span>
            )}
          </Button>
        </form>

        {showSuccess && (
          <div ref={dialogRef} className={`fixed inset-0 z-50 flex items-center justify-center ${theme === 'dark' ?'' : ''}`} style={{ opacity: 0 }}>
            <div className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-md w-full mx-4 relative ${theme === 'dark' ? 'shadow-2xl' : 'shadow-2xl'}`}>
              <div className="text-center">
                <div className={`${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100'} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Check size={28} className="text-blue-500 sm:size-[32px]" />
                </div>
                <h3 className={`text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Message Sent
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base mb-6`}>
                  We'll get back to you soon.
                </p>
                <Button onClick={closeDialog} className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
