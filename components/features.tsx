"use client";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="border-t" id="about">
      <div className="flex w-full flex-col items-center justify-center gap-24 bg-brand-50 px-6 py-24">
        <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-12">
          {/* Text with smooth slide-in animation when in view */}
          <motion.div
            className="flex flex-col items-center gap-6 max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4 w-full">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl leading-tight text-center font-normal"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                About
              </motion.h2>
              <motion.div
                className="text-base sm:text-lg md:text-xl leading-relaxed text-subtext-color px-4 sm:px-0 font-normal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-left">
                  ThirdEye Ai is where computer vision meets a passion for
                  sports and a feel for design. We use high-precision AI to
                  uncover the hidden beauty in sport: the moments that are too
                  fast, too subtle, too easily missed.
                </p>
                <p className="text-left mt-4">
                  Our goal is to bring these insights to players and fans in a
                  way that feels intuitive, accessible and visually powerful.
                  Our team is spread across the world, from India to France and
                  beyond, united by one thing: love of the game!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
