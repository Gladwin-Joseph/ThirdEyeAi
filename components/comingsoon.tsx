"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export default function ComingSoon() {
  const { theme } = useTheme();

  return (
    <section className={`border-t ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="flex w-full flex-col items-center justify-center gap-24 px-6 py-32">
        <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-12">
          <motion.div
            className="flex flex-col items-center gap-8 max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            {/* Animated icon container */}
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0.9, rotate: -5 }}
              whileInView={{ 
                scale: 1, 
                rotate: 0,
                transition: { 
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2
                } 
              }}
            >
              <div className={`absolute inset-0 rounded-full ${
                theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100'
              }`}></div>
              
              <motion.div
                className={`relative p-6 rounded-full ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-lg border ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={theme === 'dark' ? "#3b82f6" : "#2563eb"}
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.5l-.394-.933a2.25 2.25 0 00-1.423-1.423L13.5 18.5l.933-.394a2.25 2.25 0 001.423-1.423l.394-.933.394.933a2.25 2.25 0 001.423 1.423l.933.394-.933.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </motion.div>
            </motion.div>

            <div className="flex flex-col items-center gap-6 w-full text-center">
              <motion.h2
                className={`text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.4
                  } 
                }}
              >
                Coming Soon
              </motion.h2>
              
              <motion.p
                className={`text-lg sm:text-xl md:text-2xl max-w-2xl ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ 
                  opacity: 1,
                  transition: { 
                    duration: 1, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.6
                  } 
                }}
              >
                Watch this space to see our first product in action, on a green field not far from you!
              </motion.p>

              <motion.div
                className="mt-8 flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ 
                  opacity: 1,
                  transition: { 
                    duration: 1, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.8
                  } 
                }}
              >
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}