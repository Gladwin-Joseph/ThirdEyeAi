"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView
} from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export default function Hero() {
  const { theme } = useTheme();

  const firstLine = "Ce qui est important,";
  const secondLine = "ça ne se voit pas ...";
  const svgRef = useRef(null);
  const isInView = useInView(svgRef, { once: true, margin: "-20%" });

  const [displayedFirstLine, setDisplayedFirstLine] = useState("");
  const [displayedSecondLine, setDisplayedSecondLine] = useState("");
  

  const sectionRef = useRef<HTMLDivElement>(null);
  const [logoStage, setLogoStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const firstTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const secondTextOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.45], [0, 1, 0]);
  const logoOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.6, 0.95],  
    [0, 1, 0]         
  );
  const logoFadeDuration = 0.5;
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6],
    [0, theme === 'dark' ? 0.6 : 0.4, 0]
  );
  const logoScale = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85],  // Adjusted timing to match longer visibility
    [1, 1.05, 1.05]    // Smooth scale animation
  );
  
  const logoY = useTransform(
    scrollYProgress, 
    [0.6, 0.85, 0.9],  // Adjusted timing
    [0, -40, -50]      // Smoother upward movement
  );
  
  
  useEffect(() => {
    let i = 0;
    const interval1 = setInterval(() => {
      if (i < firstLine.length) {
        setDisplayedFirstLine(firstLine.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval1);
        let j = 0;
        const interval2 = setInterval(() => {
          if (j < secondLine.length) {
            setDisplayedSecondLine(secondLine.slice(0, j + 1));
            j++;
          } else {
            clearInterval(interval2);
          }
        }, 50);
      }
    }, 50);

    return () => clearInterval(interval1);
  }, []);

  useEffect(() => {
    const unsubscribe = logoOpacity.on("change", (value) => {
      if (value > 0.5 && logoStage === 0) {
        setLogoStage(1);
        setTimeout(() => setLogoStage(2), 800);
        setTimeout(() => setLogoStage(3), 1600);
      }
    });

    return () => unsubscribe();
  }, [logoOpacity, logoStage]);

  return (
    <div ref={sectionRef} className="relative min-h-[550vh]">
      {/* First Quote */}
      <motion.section
        style={{ opacity: firstTextOpacity }}
        className="sticky top-0 z-10 container flex min-h-screen max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32"
      >
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-20">
          {displayedFirstLine}
          {displayedFirstLine.length === firstLine.length && <br />}
          {displayedSecondLine}
        </h1>

        <motion.div
  className="absolute bottom-12 flex flex-col items-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1, duration: 0.8 }}
  style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
>
  <div className="relative w-6 h-10 border-2 border-foreground rounded-full flex justify-center overflow-hidden mb-14">
    <motion.div
      className="absolute w-1.5 h-1.5 bg-foreground rounded-full"
      animate={{ y: [4, 14, 4] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    />
  </div>
</motion.div>
      </motion.section>

      {/* Second Quote */}
      <motion.section
  ref={svgRef}
  style={{ opacity: secondTextOpacity }}
  className="sticky top-0 z-20 container flex min-h-screen max-w-screen-2xl flex-col items-center justify-center py-24 text-center md:py-32"
>
  <AnimatePresence>
    {isInView && (
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="text-4xl sm:text-5xl md:text-6xl font-normal text-black dark:text-white"
      >
        Sauf peut-être avec...
      </motion.h1>
    )}
  </AnimatePresence>
</motion.section>

      {/* Overlay */}
      <motion.div
        className={`fixed inset-0 pointer-events-none z-15 ${
          theme === 'dark' ? 'bg-black' : 'bg-white/50'
        }`}
        style={{ opacity: overlayOpacity }}
      />

      {/* Logo Reveal */}
      <motion.div
        className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
        style={{
          opacity: logoOpacity,
          scale: logoScale,
          y: logoY,
          transition: {
            opacity: {duration: logoFadeDuration,ease:"easeOut"}
          },
          willChange: "transform, opacity"
        }}
      >
        <div className="w-64 h-64 md:w-80 md:h-80 relative flex flex-col items-center justify-center">
          {/* Logo animation parts */}
          <AnimatePresence>
            {logoStage >= 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                <svg viewBox="0 0 1080 1080" className="w-full">
                <path
                    d="M170,719.35v-11.08h50.01v11.08h-50.01ZM188.16,788.6v-101.41h11.54v101.41h-11.54Z"
                    fill= {theme === 'dark' ? "#ffffff" : "#000000"}
                  />
                  <path
                    d="M237.56,788.6v-113.87h11.54v51.09l-2.31,2.31c1.13-4.2,3.23-7.92,6.31-11.16,3.08-3.23,6.69-5.77,10.85-7.62,4.15-1.85,8.39-2.77,12.69-2.77,6.16,0,11.28,1.18,15.39,3.54,4.1,2.36,7.16,6,9.16,10.93,2,4.92,3,11.18,3,18.77v48.78h-11.69v-48.16c0-5.33-.69-9.72-2.08-13.16-1.38-3.44-3.51-5.97-6.39-7.62-2.87-1.64-6.46-2.41-10.77-2.31-3.39,0-6.57.59-9.54,1.77-2.98,1.18-5.54,2.8-7.69,4.85-2.15,2.05-3.85,4.41-5.08,7.08-1.23,2.67-1.85,5.54-1.85,8.62v48.93h-11.54Z"
                    fill= {theme === 'dark' ? "#ffffff" : "#000000"}
                  />
                  <path
                    d="M338.34,690.89c-2.87,0-5.05-.74-6.54-2.23-1.49-1.49-2.23-3.51-2.23-6.08s.77-4.62,2.31-6.16,3.69-2.31,6.46-2.31,4.92.75,6.46,2.23c1.54,1.49,2.31,3.57,2.31,6.23,0,2.46-.77,4.46-2.31,6s-3.69,2.31-6.46,2.31ZM332.65,788.6v-80.32h11.54v80.32h-11.54Z"
                    fill={theme === 'dark' ? "#ffffff" : "#000000"}
                  />
                  <path
                    d="M372.81,788.6v-80.32h11.54l.31,21.39-1.23-2.92c1.13-3.59,2.95-6.92,5.46-10,2.51-3.08,5.51-5.54,9-7.39,3.49-1.85,7.33-2.77,11.54-2.77,1.74,0,3.39.13,4.92.38,1.54.26,2.82.59,3.85,1l-3.23,12.93c-1.33-.62-2.69-1.05-4.08-1.31-1.39-.25-2.69-.38-3.92-.38-3.49,0-6.62.62-9.39,1.85-2.77,1.23-5.13,2.95-7.08,5.15-1.95,2.21-3.44,4.75-4.46,7.62-1.03,2.87-1.54,5.95-1.54,9.23v45.55h-11.69Z"
                    fill={theme === 'dark' ? "#ffffff" : "#000000"}
                  />
                  <path
                    d="M462.83,790.14c-7.29,0-13.82-1.79-19.62-5.39-5.8-3.59-10.36-8.54-13.69-14.85-3.33-6.31-5-13.46-5-21.47s1.69-15.31,5.08-21.62c3.39-6.31,7.95-11.26,13.7-14.85,5.74-3.59,12.21-5.39,19.39-5.39,4,0,7.87.62,11.62,1.85,3.74,1.23,7.1,2.95,10.08,5.16,2.97,2.21,5.44,4.72,7.39,7.54,1.95,2.82,3.13,5.77,3.54,8.85l-3.54-1.23v-54.01h11.54v113.87h-11.39l-.31-20,2.92-1.08c-.41,2.87-1.57,5.67-3.46,8.39-1.9,2.72-4.28,5.16-7.16,7.31-2.87,2.15-6.13,3.85-9.77,5.08-3.64,1.23-7.41,1.85-11.31,1.85ZM464.52,779.52c5.33,0,10.1-1.33,14.31-4,4.21-2.67,7.51-6.36,9.93-11.08,2.41-4.72,3.62-10.1,3.62-16.16s-1.21-11.41-3.62-16.08c-2.41-4.67-5.72-8.36-9.93-11.08-4.21-2.72-8.98-4.08-14.31-4.08s-10.39,1.36-14.54,4.08c-4.15,2.72-7.44,6.41-9.85,11.08-2.41,4.67-3.62,10.03-3.62,16.08s1.18,11.29,3.54,16c2.36,4.72,5.64,8.44,9.85,11.16,4.2,2.72,9.08,4.08,14.62,4.08Z"
                    fill={theme === 'dark' ? "#ffffff" : "#000000"}
                  />
                  <path
                    d="M564.54,790.14c-8,0-15.11-1.74-21.31-5.23-6.21-3.49-11.06-8.36-14.54-14.62-3.49-6.26-5.23-13.44-5.23-21.54,0-6.26.97-11.93,2.92-17,1.95-5.08,4.69-9.51,8.23-13.31,3.54-3.79,7.77-6.74,12.69-8.85,4.92-2.1,10.26-3.15,16-3.15,5.44,0,10.39.98,14.85,2.92,4.46,1.95,8.31,4.64,11.54,8.08,3.23,3.44,5.67,7.52,7.31,12.23,1.64,4.72,2.36,9.9,2.15,15.54l-.15,5.39h-66.94l-1.69-9.69h59.86l-2.77,2.62v-3.69c-.21-3.69-1.28-7.26-3.23-10.69-1.95-3.44-4.69-6.23-8.23-8.39-3.54-2.15-7.77-3.23-12.69-3.23-5.75,0-10.72,1.15-14.93,3.46-4.21,2.31-7.44,5.72-9.69,10.23-2.26,4.52-3.39,10.11-3.39,16.77s1.23,11.87,3.69,16.54c2.46,4.67,5.97,8.29,10.54,10.85,4.56,2.57,10.08,3.85,16.54,3.85,3.79,0,7.56-.64,11.31-1.92,3.74-1.28,7.87-3.82,12.39-7.62l6,8.31c-2.36,2.36-5.18,4.44-8.46,6.23-3.28,1.8-6.87,3.23-10.77,4.31-3.9,1.08-7.9,1.62-12,1.62Z"
                    fill={theme === 'dark' ? "#ffffff" : "#000000"}
                  />
                  <path
                    d="M631.02,823.99l15.54-37.85,1.08,10.93-40.32-88.79h13.08l27.54,61.55c.82,1.64,1.64,3.57,2.46,5.77.82,2.21,1.59,4.39,2.31,6.54l-4.31-.46c.72-1.74,1.41-3.54,2.08-5.39.67-1.85,1.31-3.64,1.92-5.39l24.16-62.63h13.23l-32.47,80.32-13.85,35.39h-12.46Z"
                    fill={theme === 'dark' ? "#ffffff" : "#000000"}
                  />
                  <path
                    d="M739.19,790.14c-8,0-15.11-1.74-21.31-5.23-6.21-3.49-11.06-8.36-14.54-14.62-3.49-6.26-5.23-13.44-5.23-21.54,0-6.26.97-11.93,2.92-17,1.95-5.08,4.69-9.51,8.23-13.31,3.54-3.79,7.77-6.74,12.69-8.85,4.92-2.1,10.26-3.15,16-3.15,5.44,0,10.39.98,14.85,2.92,4.46,1.95,8.31,4.64,11.54,8.08,3.23,3.44,5.67,7.52,7.31,12.23,1.64,4.72,2.36,9.9,2.15,15.54l-.15,5.39h-66.94l-1.69-9.69h59.86l-2.77,2.62v-3.69c-.21-3.69-1.28-7.26-3.23-10.69-1.95-3.44-4.69-6.23-8.23-8.39-3.54-2.15-7.77-3.23-12.69-3.23-5.75,0-10.72,1.15-14.93,3.46-4.21,2.31-7.44,5.72-9.69,10.23-2.26,4.52-3.39,10.11-3.39,16.77s1.23,11.87,3.69,16.54c2.46,4.67,5.97,8.29,10.54,10.85,4.56,2.57,10.08,3.85,16.54,3.85,3.79,0,7.56-.64,11.31-1.92,3.74-1.28,7.87-3.82,12.39-7.62l6,8.31c-2.36,2.36-5.18,4.44-8.46,6.23-3.28,1.8-6.87,3.23-10.77,4.31-3.9,1.08-7.9,1.62-12,1.62Z"
                    fill={theme === 'dark' ? "#ffffff" : "#000000"}
                  />
                  <path
                    d="M825.06,790.14c-6.98,0-13.29-1.82-18.93-5.46-5.64-3.64-10.11-8.62-13.39-14.93-3.28-6.31-4.92-13.46-4.92-21.47s1.69-15.28,5.08-21.54c3.39-6.26,7.92-11.18,13.62-14.77,5.69-3.59,12.08-5.39,19.16-5.39,4.2,0,8.1.62,11.69,1.85,3.59,1.23,6.79,2.95,9.62,5.16,2.82,2.21,5.18,4.77,7.08,7.69,1.9,2.92,3.2,6.08,3.92,9.46l-3.39-1.69.46-20.77h11.54v80.32h-11.69v-19.7l3.08-2c-.72,3.08-2.1,6.03-4.16,8.85-2.05,2.82-4.54,5.31-7.46,7.46-2.92,2.15-6.21,3.85-9.85,5.08-3.64,1.23-7.46,1.85-11.46,1.85ZM827.67,779.06c5.33,0,10.1-1.31,14.31-3.92,4.21-2.62,7.51-6.26,9.93-10.93,2.41-4.67,3.62-9.98,3.62-15.93s-1.21-11.23-3.62-15.85c-2.41-4.62-5.72-8.26-9.93-10.93-4.21-2.67-8.98-4-14.31-4s-10.23,1.33-14.39,4c-4.15,2.67-7.44,6.31-9.85,10.93-2.41,4.62-3.62,9.9-3.62,15.85s1.18,11.11,3.54,15.77c2.36,4.67,5.64,8.34,9.85,11,4.21,2.67,9.03,4,14.46,4Z"
                    fill="#0056D6"
                  />
                  <path
                    d="M901.22,690.89c-2.87,0-5.05-.74-6.54-2.23-1.49-1.49-2.23-3.51-2.23-6.08s.77-4.62,2.31-6.16,3.69-2.31,6.46-2.31,4.92.75,6.46,2.23c1.54,1.49,2.31,3.57,2.31,6.23,0,2.46-.77,4.46-2.31,6s-3.69,2.31-6.46,2.31ZM895.53,788.6v-80.32h11.54v80.32h-11.54Z"
                    fill="#0056D6"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {logoStage >= 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                <svg viewBox="0 0 1080 1080" className="w-full h-full">
                  <circle cx="540" cy="332.19" r="76.18" fill="#0056D6" />
                  <circle cx="443.4" cy="502.52" r="76.18" fill="#0056D6" />
                  <circle cx="636.6" cy="502.52" r="76.18" fill="#0056D6" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {logoStage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-[-60px] w-full text-center"
              >
                <p className={`text-xl font-normal mb-20 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  for the game!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="h-[100vh]" />
    </div>
  );
}